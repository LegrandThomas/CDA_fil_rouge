import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "./entity/user"
import {Role} from "./entity/role"
import {Comment} from "./entity/comment"
import {Have} from "./entity/have"
import {Ressource} from "./entity/ressource"
import {RessourceStatus} from "./entity/ressourceStatus"
import {RessourceStatusHistory} from "./entity/ressourceStatusHistory"
import {Tag} from "./entity/tag"
import {Follow} from "./entity/follow"
import {Refer} from "./entity/refer"
import {RessourceType} from "./entity/ressourceType"
import {SharingSession} from "./entity/sharingSession"
import {Reference} from "./entity/reference"
import {InitMigration1723112057042} from './migration/1723112057042-initMigration'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "user_beginners",
    password: "pass_beginners",
    database: "db_beginners",
    synchronize: true,
    logging: "all",
    entities: [User, Role, Comment, Tag, Have, Ressource, RessourceStatus, RessourceStatusHistory, Follow, Refer, Reference, RessourceType, SharingSession],
    migrations: [InitMigration1723112057042],
    subscribers: [],
})

export const initializeDataSource = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("DataSource initialized");
    } 
};
