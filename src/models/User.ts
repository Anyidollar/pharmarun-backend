import { DataTypes, Model } from "sequelize";
import { database } from "../configs/database";
import Order from "./Order";

export enum role {
  ADMIN = "admin",
  USER = "user",
}

export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  role?: string;
  email?: string;
  telephone?: string;
}

export class User extends Model<UserAttributes> {
  [x: string]: any;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
      defaultValue: "user",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
  },
  {
    sequelize: database,
    tableName: "User",
    timestamps: true,
    indexes: [
      {
        name: "users_id_foreign",
        fields: ["id"],
      },
    ],
  }
);

export default User;
