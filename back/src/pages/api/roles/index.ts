import type { NextApiRequest, NextApiResponse } from 'next';
import { RoleService } from '@/services/roleService';
import { RoleController } from '@/controllers/roleController';
import { initializeDataSource } from '../../../data-source';
import Cors from 'nextjs-cors';

const roleService = new RoleService();
const roleController = new RoleController(roleService);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initializeDataSource();
  await Cors(req, res, {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin: 'http://localhost:3000'
  });

  switch (req.method) {
    case 'GET':
        // Check if the request is for a single role by ID or all roles
        if (req.query.role_uuid) {
            return roleController.getRoleById(req, res);
        } else {
            return roleController.getAllRoles(req, res);
        }
    case 'POST':
      return roleController.createRole(req, res);
    case 'PUT':
      return roleController.replaceRole(req, res);
    case 'DELETE':
      return roleController.deleteRole(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
