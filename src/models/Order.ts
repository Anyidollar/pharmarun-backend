import { DataTypes, Model } from "sequelize";
import { database } from "../configs/database";
import DeliveryPartner from "./Delivery";
import Medication from "./Medication";
import User from "./User";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export interface OrderAttributes {
  id: string;
  user_id: string;
  medication_id: string;
  delivery_partner_id?: string | null;
  status: OrderStatus;
}

export class Order extends Model<OrderAttributes> {
  [x: string]: any;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    medication_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    delivery_partner_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.PENDING,
    },
  },
  {
    sequelize: database,
    tableName: "Order",
    timestamps: true,
    indexes: [
      {
        name: "orders_user_id_foreign",
        fields: ["user_id"],
      },
      {
        name: "orders_medication_id_foreign",
        fields: ["medication_id"],
      },
      {
        name: "orders_delivery_partner_id_foreign",
        fields: ["delivery_partner_id"],
      },
    ],
  }
);



export default Order;
