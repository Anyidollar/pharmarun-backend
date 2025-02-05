import { DataTypes, Model } from "sequelize";
import { database } from "../configs/database";
import Order from "./Order";

export interface DeliveryPartnerAttributes {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
}

export class DeliveryPartner extends Model<DeliveryPartnerAttributes> {
  [x: string]: any;
}

DeliveryPartner.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: database,
    tableName: "DeliveryPartner",
    timestamps: true,
    indexes: [
      {
        name: "delivery_partner_name_index",
        fields: ["name"],
      },
    ],
  }
);


export default DeliveryPartner;
