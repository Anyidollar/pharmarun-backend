import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const database = new Sequelize(
  `${process.env.DB_NAME}`, // Use DB_NAME instead of DB_DATABASE
  `${process.env.DB_USER}`, // Use DB_USER instead of DB_USERNAME
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mysql",
    logging: false,
  }
);
