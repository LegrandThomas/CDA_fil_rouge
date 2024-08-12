import { NextApiRequest, NextApiResponse } from "next";
import { initializeDataSource } from '../../../data-source';
import { Ressources_typesController } from "@/controllers/ressources_typesController";
import { Ressources_typesService } from "@/services/ressources_typeService";
import Cors from 'nextjs-cors';

const ressources_typesService = new Ressources_typesService();
const ressources_typesController = new Ressources_typesController(ressources_typesService);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initializeDataSource();
  await Cors(req, res, {
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    origin: 'http://localhost:3000'
  });

  

  switch (req.method) {
    case "POST":
      
      break;
    
    case "GET":
     
        await ressources_typesController.getAllRessources_types(req, res);
      
      break;

    case "PUT":
       
        return;  

    case "PATCH":
     
      break;

    case "DELETE":
     
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
  }
}