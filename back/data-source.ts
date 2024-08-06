// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user_beginners',
  password: 'pass_beginners',
  database: 'db_beginners',
  synchronize: true,
  logging: true,
  entities: ["./src/entity/**/*.{ts,js}"],
  migrations: ['./src/migration/**/*.{ts,js}'],
  subscribers: [],
  
});
