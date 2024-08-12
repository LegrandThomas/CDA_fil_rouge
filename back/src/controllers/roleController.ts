import { NextApiRequest, NextApiResponse } from 'next';
import { RoleService } from '@/services/roleService';
import Joi from 'joi';
import { EntityNotFoundError, UniqueConstraintViolationError } from '../errors/errors';

// Schema for validating role creation and updates
const roleSchema = Joi.object({
  role_name: Joi.string().required(),
});

export class RoleController {
  private roleService: RoleService;

  /**
   * Creates an instance of RoleController.
   * @param roleService - Service for managing roles.
   */
  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  /**
   * Handles the creation of a new role.
   * Validates request data, creates a new role, and returns it.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The created role or an error response.
   */
  async createRole(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Validate request data
      const { error } = roleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Create new role
      const newRole = await this.roleService.createRole(req.body);
      return res.status(201).json(newRole);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationError) {
        return res.status(409).json({ error: error.message });
      }

      // Handle non-specific errors
      console.error("Error creating role:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Retrieves all roles.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns A list of roles or an error response.
   */
  async getAllRoles(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Retrieve all roles
      const roles = await this.roleService.getAllRoles();
      return res.status(200).json(roles);
    } catch (error) {
      // Handle errors
      console.error("Error fetching roles:", error);
      return res.status(500).json({ error: "Error fetching roles" });
    }
  }

  /**
     * Retrieves a role by its UUID.
     * @param req - The API request object.
     * @param res - The API response object.
     * @returns The role if found or an error response.
     */
  async getRoleById(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Validate the UUID
        const { role_uuid } = req.query;
        if (typeof role_uuid !== 'string') {
            return res.status(400).json({ error: "Invalid role UUID" });
        }

        // Retrieve the role
        const role = await this.roleService.getRoleById(role_uuid);
        if (role) {
            return res.status(200).json(role);
        } else {
            return res.status(404).json({ error: "Role not found" });
        }
    } catch (error) {
        if (error instanceof EntityNotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        console.error("Error retrieving role by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

  /**
   * Replaces an existing role with new data.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The updated role or an error response.
   */
  async replaceRole(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { role_uuid } = req.query;
      if (typeof role_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid role UUID" });
      }

      // Validate request data
      const { error } = roleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Replace the role
      const updatedRole = await this.roleService.replaceRole(role_uuid, req.body);
      if (updatedRole) {
        return res.status(200).json(updatedRole);
      } else {
        return res.status(404).json({ error: "Role not found" });
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      console.error("Error replacing role:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Deletes a role by its UUID.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns A 204 status if deletion is successful or an error response.
   */
  async deleteRole(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { role_uuid } = req.query;
      if (typeof role_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid role UUID" });
      }

      // Delete the role
      const success = await this.roleService.deleteRole(role_uuid);
      if (success) {
        return res.status(204).end();
      } else {
        return res.status(404).json({ error: "Role not found" });
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
