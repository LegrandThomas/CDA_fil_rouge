import { AppDataSource } from "@/data-source";
import { Role } from "@/entity/role";
import { EntityNotFoundError, UniqueConstraintViolationError } from "../errors/errors";

interface CreateRoleDTO {
    role_name: string;
}

export class RoleService {
    /**
     * Retrieves all roles from the database.
     * @returns A promise that resolves to an array of roles.
     */
    async getAllRoles(): Promise<Role[]> {
        return await AppDataSource.manager.find(Role);
    }

     /**
     * Retrieves a role by its UUID.
     * @param role_uuid - UUID of the role to be retrieved.
     * @returns A promise that resolves to the role if found, null otherwise.
     * @throws EntityNotFoundError - If the role with the given UUID does not exist.
     */
     async getRoleById(role_uuid: string): Promise<Role | null> {
      try {
          // Find the role by its UUID
          const role = await AppDataSource.manager.findOne(Role, { where: { role_uuid } });
          if (!role) {
              throw new EntityNotFoundError('Role', role_uuid);
          }
          return role;
      } catch (error) {
          if (error instanceof EntityNotFoundError) {
              throw error;
          }
          console.error("Error fetching role by ID:", error);
          throw new Error('An error occurred while fetching the role');
      }
  }

    /**
     * Creates a new role in the database.
     * Checks if the role name already exists and throws an error if it does.
     * @param roleData - Data for the new role.
     * @returns A promise that resolves to the created role.
     * @throws UniqueConstraintViolationError - If a role with the same name already exists.
     */
    async createRole(roleData: CreateRoleDTO): Promise<Role> {
        try {
            // Check if a role with the same name already exists
            const existingRole = await AppDataSource.manager.findOne(Role, { where: { role_name: roleData.role_name } });
            if (existingRole) {
                throw new UniqueConstraintViolationError('Role name already exists');
            }

            // Create and save the new role
            const role = AppDataSource.manager.create(Role, roleData);
            return await AppDataSource.manager.save(role);
        } catch (error) {
            if (error instanceof UniqueConstraintViolationError) {
                throw error;
            }
            console.error("Error creating role:", error);
            throw new Error('An error occurred while creating the role');
        }
    }

    /**
     * Replaces an existing role with new data.
     * @param role_uuid - UUID of the role to be replaced.
     * @param roleData - New data for the role.
     * @returns A promise that resolves to the updated role or null if not found.
     * @throws EntityNotFoundError - If the role with the given UUID does not exist.
     */
    async replaceRole(role_uuid: string, roleData: Partial<CreateRoleDTO>): Promise<Role | null> {
        try {
            // Find the role to be replaced
            const existingRole = await AppDataSource.manager.findOne(Role, { where: { role_uuid } });
            if (!existingRole) {
                throw new EntityNotFoundError('Role', role_uuid);
            }

            // Update and save the role
            const updatedRole = await AppDataSource.manager.save(Role, { ...existingRole, ...roleData });
            return updatedRole;
        } catch (error) {
            if (error instanceof UniqueConstraintViolationError || error instanceof EntityNotFoundError) {
                throw error;
            }
            console.error("Error replacing role:", error);
            throw new Error('An error occurred while replacing the role');
        }
    }

    /**
     * Deletes a role by its UUID.
     * @param role_uuid - UUID of the role to be deleted.
     * @returns A promise that resolves to true if the deletion was successful, false otherwise.
     */
    async deleteRole(role_uuid: string): Promise<boolean> {
        try {
            // Delete the role and return whether the operation was successful
            const result = await AppDataSource.manager.delete(Role, { role_uuid });
            return result.affected !== null && result.affected !== undefined && result.affected > 0;
        } catch (error) {
            console.error("Error deleting role:", error);
            throw error;
        }
    }
}
