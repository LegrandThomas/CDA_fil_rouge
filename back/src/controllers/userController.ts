import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "../services/userService";
import { sanitize } from 'sanitizer';
import { hashPassword } from '../utils/authUtils';
import Joi from 'joi';
import { EntityNotFoundError, UniqueConstraintViolationError } from "@/errors/errors";

const userSchema = Joi.object({
  role_uuid: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(12)
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[a-z]/, 'lowercase')
    .pattern(/[0-9]/, 'digit')
    .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
    .required()
    .messages({
      'string.min': 'Password must be at least 12 characters long',
      'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'string.empty': 'Password is required'
    }),
  is_active: Joi.boolean().required(),
});

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * Validates whether the provided email follows a standard format.
   * @param email - The email string to validate.
   * @returns Boolean indicating whether the email is valid.
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Sanitizes input strings to remove potential harmful content.
   * @param input - The input string to sanitize.
   * @returns The sanitized string.
   */
  private sanitizeInput(input: string): string {
    return sanitize(input.trim());
  }

  /**
   * Handles the creation of a new user.
   * Validates the request body, sanitizes input, and hashes the password before saving the user.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The created user or an error response.
   */
  async createUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { role_uuid, username, email, password, is_active } = req.body;
  
      const role = await this.userService.getRoleById(role_uuid);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
  
      const hashedPassword = await hashPassword(password);
  
      const newUser = await this.userService.createUser({
        role,
        username: this.sanitizeInput(username),
        email: this.sanitizeInput(email),
        password: hashedPassword,
        is_active
      });
  
      return res.status(201).json(newUser);
  
    } catch (error) {
      if (error instanceof UniqueConstraintViolationError) {
        return res.status(409).json({ error: error.message });
      }
  
      if (error instanceof EntityNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
  
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  

  /**
   * Retrieves all users from the database.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns A list of users or an error response.
   */
  async getAllUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  }

  /**
   * Retrieves a user by their UUID.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The user if found, or an error response if not.
   */
  async getUserById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const user_uuid = this.sanitizeInput(req.query.user_uuid as string);
      if (typeof user_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid user UUID" });
      }

      const user = await this.userService.getUserById(user_uuid);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user by UUID:", error);
      res.status(500).json({ error: "Error fetching user by UUID" });
    }
  }

  /**
   * Retrieves a user by their username.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The user if found, or an error response if not.
   */
  async getUserByUsername(req: NextApiRequest, res: NextApiResponse) {
    try {
      const username = this.sanitizeInput(req.query.username as string);
      if (typeof username !== 'string') {
        return res.status(400).json({ error: "Invalid username" });
      }

      const user = await this.userService.getUserByUsername(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Username not found" });
      }
    } catch (error) {
      console.error("Error fetching user by username:", error);
      res.status(500).json({ error: "Error fetching user by username" });
    }
  }


  /**
   * Updates specific fields of a user by their UUID.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The updated user or an error response if not found.
   */
  async updateUserPatch(req: NextApiRequest, res: NextApiResponse) {
    try {
      const user_uuid = this.sanitizeInput(req.query.user_uuid as string);
      const { role_uuid, username, email, password } = req.body;

      if (typeof user_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid user UUID" });
      }

      if (role_uuid) {
        const roleExists = await this.userService.getRoleById(role_uuid);
        if (!roleExists) {
          return res.status(404).json({ error: "Role not found" });
        }
      }

      const updatedFields: any = {};
      if (username) updatedFields.username = this.sanitizeInput(username);
      if (email) updatedFields.email = this.sanitizeInput(email);
      if (password) {
        // Validate the password before hashing
        const { error } = Joi.object({
          password: Joi.string()
            .min(12)
            .pattern(/[A-Z]/, 'uppercase')
            .pattern(/[a-z]/, 'lowercase')
            .pattern(/[0-9]/, 'digit')
            .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
            .required()
        }).validate({ password });
        
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        updatedFields.password = await hashPassword(password);
      }

      const updatedUser = await this.userService.updateUserFields(user_uuid, updatedFields);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  }



  /**
   * Replaces a user with new data.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The updated user or an error response if not found.
   */
  async replaceUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const user_uuid = this.sanitizeInput(req.query.user_uuid as string);
      const { username, email, password, is_active, role } = req.body;

      if (!user_uuid || typeof user_uuid !== 'string') {
        return res.status(400).json({ error: "User UUID is required and must be a string" });
      }

      if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: "username is required and must be a string" });
      }
      if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
        return res.status(400).json({ error: "A valid email is required" });
      }
      if (password) {
        // Validate the password before hashing
        const { error } = Joi.object({
          password: Joi.string()
            .min(12)
            .pattern(/[A-Z]/, 'uppercase')
            .pattern(/[a-z]/, 'lowercase')
            .pattern(/[0-9]/, 'digit')
            .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
            .required()
        }).validate({ password });
        
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
      }
      if (typeof is_active !== 'boolean') {
        return res.status(400).json({ error: "is_active is required and must be a boolean" });
      }

      if (role?.role_uuid) {
        const roleExists = await this.userService.getRoleById(role.role_uuid);
        if (!roleExists) {
          return res.status(404).json({ error: "Role not found" });
        }
      }

      const hashedPassword = password ? await hashPassword(password) : '';

      const updatedUser = await this.userService.replaceUser(user_uuid, {
        username: this.sanitizeInput(username),
        email: this.sanitizeInput(email),
        password: hashedPassword,
        is_active,
        role
      });
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  }


  /**
   * Deletes a user by their UUID.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns A 204 status if deletion is successful, or an error response if not found.
   */
  async deleteUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const user_uuid = this.sanitizeInput(req.query.user_uuid as string);
      if (typeof user_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid user UUID" });
      }

      const success = await this.userService.deleteUser(user_uuid);
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  }
}
