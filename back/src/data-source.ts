import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "./entity/User"
import {Role} from "./entity/Role"
import {Comment} from "./entity/Comment"
import {Have} from "./entity/Have"
import {Ressource} from "./entity/Ressource"
import {RessourceStatus} from "./entity/RessourceStatus"
import {RessourceStatusHistory} from "./entity/RessourceStatusHistory"
import {Tag} from "./entity/Tag"
import {Follow} from "./entity/Follow"
import {Refer} from "./entity/Refer"
import {RessourceType} from "./entity/RessourceType"
import {SharingSession} from "./entity/SharingSession"
import {Reference} from "./entity/Reference"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user_beginners",
    password: "pass_beginners",
    database: "db_beginners",
    synchronize: true,
    logging: "all",
    entities: [User, Role, Comment, Have, Ressource, RessourceStatus, RessourceStatusHistory, Tag, Follow, Refer, Reference, RessourceType, SharingSession],
    migrations: ["./migration/*.{js,ts}"],
    subscribers: [],
})

AppDataSource.initialize();
