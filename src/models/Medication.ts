import { DataTypes, Model } from "sequelize";
import { database } from "../configs/database";
import Order from "./Order";

export interface MedicationAttributes {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export class Medication extends Model<MedicationAttributes> {
  [x: string]: any;
}

Medication.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: database,
    tableName: "Medication",
    timestamps: true,
    indexes: [
      {
        name: "medication_name_index",
        fields: ["name"],
      },
    ],
  }
);


export default Medication;
