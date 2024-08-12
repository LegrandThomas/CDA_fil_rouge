import { AppDataSource } from "@/data-source";
import { RessourceType } from "@/entity/ressourceType";
import { EntityNotFoundError, UniqueConstraintViolationError } from "../errors/errors";

interface CreateRessources_typesDTO {
    type_name: string;
}

export class Ressources_typesService {
    /**
     * Retrieves all ressources_types from the database.
     * @returns A promise that resolves to an array of RessourceType.
     */
    async getAllRessources_types(): Promise<RessourceType[]> {
        return await AppDataSource.manager.find(RessourceType);
    }

    /**
     * Retrieves a single ressources type by its UUID.
     * @param ressource_type_uuid - The UUID of the ressources type to retrieve.
     * @returns A promise that resolves to the found RessourceType or null if not found.
     * @throws EntityNotFoundError if the ressources type is not found.
     */
    async getRessources_typeById(ressource_type_uuid: string): Promise<RessourceType | null> {
        try {
            const ressources_type = await AppDataSource.manager.findOne(RessourceType, { where: { ressource_type_uuid } });
            if (!ressources_type) {
                throw new EntityNotFoundError("RessourceType", ressource_type_uuid);
            }
            return ressources_type;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw error;
            }
            console.error("Error fetching ressource type by ID:", error);
            throw new Error('An error occurred while fetching the ressource type');
        }
    }

    /**
     * Creates a new ressources type in the database.
     * Checks if the type_name already exists and throws an error if it does.
     * @param data - The data to create the ressources type.
     * @returns A promise that resolves to the created RessourceType.
     * @throws UniqueConstraintViolationError if the type_name already exists.
     */
    async createRessources_type(data: CreateRessources_typesDTO): Promise<RessourceType> {
        try {
            const existingType = await AppDataSource.manager.findOne(RessourceType, { where: { type_name: data.type_name } });
            if (existingType) {
                throw new UniqueConstraintViolationError("Ressource type with this name already exists.");
            }

            const newRessources_type = AppDataSource.manager.create(RessourceType, data);
            return await AppDataSource.manager.save(newRessources_type);
        } catch (error) {
            if (error instanceof UniqueConstraintViolationError) {
                throw error;
            }
            console.error("Error creating ressource type:", error);
            throw new Error('An error occurred while creating the ressource type');
        }
    }

    /**
     * Replaces an existing ressources type with new data.
     * @param ressource_type_uuid - The UUID of the ressources type to replace.
     * @param data - The new data for the ressources type.
     * @returns A promise that resolves to the updated RessourceType or null if not found.
     * @throws EntityNotFoundError if the ressources type with the given UUID does not exist.
     */
    async replaceRessources_type(ressource_type_uuid: string, data: Partial<CreateRessources_typesDTO>): Promise<RessourceType | null> {
        try {
            const existingType = await AppDataSource.manager.findOne(RessourceType, { where: { ressource_type_uuid } });
            if (!existingType) {
                throw new EntityNotFoundError("RessourceType", ressource_type_uuid);
            }

            // If the type_name is being updated, check if it's unique
            if (data.type_name) {
                const typeWithSameName = await AppDataSource.manager.findOne(RessourceType, { where: { type_name: data.type_name } });
                if (typeWithSameName && typeWithSameName.ressource_type_uuid !== ressource_type_uuid) {
                    throw new UniqueConstraintViolationError("Ressource type with this name already exists.");
                }
            }

            const updatedRessources_type = await AppDataSource.manager.save(RessourceType, { ...existingType, ...data });
            return updatedRessources_type;
        } catch (error) {
            if (error instanceof UniqueConstraintViolationError || error instanceof EntityNotFoundError) {
                throw error;
            }
            console.error("Error replacing ressource type:", error);
            throw new Error('An error occurred while replacing the ressource type');
        }
    }

    /**
     * Deletes a ressources type by its UUID.
     * @param ressource_type_uuid - The UUID of the ressources type to delete.
     * @returns A promise that resolves to true if the deletion was successful, false otherwise.
     * @throws EntityNotFoundError if the ressources type with the given UUID does not exist.
     */
    async deleteRessources_type(ressource_type_uuid: string): Promise<boolean> {
        try {
            const result = await AppDataSource.manager.delete(RessourceType, { ressource_type_uuid });
            return result.affected !== null && result.affected !== undefined && result.affected > 0;
        } catch (error) {
            console.error("Error deleting ressource type:", error);
            throw error;
        }
    }
}
