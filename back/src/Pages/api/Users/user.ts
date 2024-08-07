import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../../data-source";
import { User } from "../../../entity/user";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Appliquer le middleware CORS
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  switch (req.method) {
    case "GET":
      const users = await AppDataSource.getRepository(User).find();
      res.status(200).json(users);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
  }
}
