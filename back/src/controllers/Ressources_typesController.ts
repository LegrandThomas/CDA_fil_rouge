import { NextApiRequest, NextApiResponse } from 'next';
import { Ressources_typesService } from '@/services/ressources_typesService';
import Joi from 'joi';
import { EntityNotFoundError, UniqueConstraintViolationError } from '../errors/errors';

// Schema for validating ressources_types creation and updates
const ressources_typesSchema = Joi.object({
  type_name: Joi.string().required(),
});

export class Ressources_typesController {
  private Ressources_typesService: Ressources_typesService;

  /**
   * Creates an instance of Ressources_typesController.
   * @param Ressources_typesService - Service for managing ressources types.
   */
  constructor(Ressources_typesService: Ressources_typesService) {
    this.Ressources_typesService = Ressources_typesService;
  }

  /**
   * Handles the creation of a new ressources type.
   * Validates request data, creates a new ressources type, and returns it.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The created ressources_type or an error response.
   */
  async createRessources_types(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Validate request data
      const { error } = ressources_typesSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Create new ressources type
      const newRessources_type = await this.Ressources_typesService.createRessources_type(req.body);
      return res.status(201).json(newRessources_type);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationError) {
        return res.status(409).json({ error: error.message });
      }

      // Handle non-specific errors
      console.error("Error creating ressources type:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Retrieves all ressources types.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns A list of ressources_types or an error response.
   */
  async getAllRessources_types(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Retrieve all ressources_types
      const ressources_types = await this.Ressources_typesService.getAllRessources_types();
      return res.status(200).json(ressources_types);
    } catch (error) {
      // Handle errors
      console.error("Error fetching ressources types:", error);
      return res.status(500).json({ error: "Error fetching ressources types" });
    }
  }

  /**
   * Retrieves a ressources type by its UUID.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The ressources type if found or an error response.
   */
  async getRessources_typesById(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Validate the UUID
      const { ressources_type_uuid } = req.query;
      if (typeof ressources_type_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid ressources type UUID" });
      }

      // Retrieve the ressources type
      const ressources_type = await this.Ressources_typesService.getRessources_typeById(ressources_type_uuid);
      if (ressources_type) {
        return res.status(200).json(ressources_type);
      } else {
        return res.status(404).json({ error: "Ressources type not found" });
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      console.error("Error retrieving ressources type by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Replaces an existing ressources type with new data.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns The updated ressources_type or an error response.
   */
  async replaceRessources_types(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { ressources_type_uuid } = req.query;
      if (typeof ressources_type_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid ressources type UUID" });
      }

      // Validate request data
      const { error } = ressources_typesSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Replace the ressources type
      const updatedRessources_type = await this.Ressources_typesService.replaceRessources_type(ressources_type_uuid, req.body);
      if (updatedRessources_type) {
        return res.status(200).json(updatedRessources_type);
      } else {
        return res.status(404).json({ error: "Ressources type not found" });
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      console.error("Error replacing ressources type:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Deletes a ressources type by its UUID.
   * @param req - The API request object.
   * @param res - The API response object.
   * @returns A 204 status if deletion is successful or an error response.
   */
  async deleteRessources_types(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { ressources_type_uuid } = req.query;
      if (typeof ressources_type_uuid !== 'string') {
        return res.status(400).json({ error: "Invalid ressources type UUID" });
      }

      // Delete the ressources type
      const success = await this.Ressources_typesService.deleteRessources_type(ressources_type_uuid);
      if (success) {
        return res.status(204).end();
      } else {
        return res.status(404).json({ error: "Ressources type not found" });
      }
    } catch (error) {
      console.error("Error deleting ressources type:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
