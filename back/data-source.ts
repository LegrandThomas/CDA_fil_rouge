import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./src/entity/user";
import { Role } from "./src/entity/role";
import { Comment } from "./src/entity/comment";
import { Have } from "./src/entity/have";
import { Ressource } from "./src/entity/ressource";
import { RessourceStatus } from "./src/entity/ressourceStatus";
import { RessourceStatusHistory } from "./src/entity/ressourceStatusHistory";
import { Tag } from "./src/entity/tag";
import { Follow } from "./src/entity/follow";
import { Refer } from "./src/entity/refer";
import { RessourceType } from "./src/entity/ressourceType";
import { SharingSession } from "./src/entity/sharingSession";
import { Reference } from "./src/entity/reference";
import { InitMigration1723112057042 } from "./src/migration/1723112057042-initMigration";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "user_beginners",
  password: "pass_beginners",
  database: "db_beginners",
  synchronize: false,
  logging: "all",
  entities: [
    User,
    Role,
    Comment,
    Tag,
    Have,
    Ressource,
    RessourceStatus,
    RessourceStatusHistory,
    Follow,
    Refer,
    Reference,
    RessourceType,
    SharingSession,
  ],
  migrations: [InitMigration1723112057042],
  subscribers: [],
});

export const initializeDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("DataSource initialized");
  }
};
