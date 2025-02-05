import User from "./User";
import Order from "./Order";
import Medication from "./Medication";
import DeliveryPartner from "./Delivery";

// User and Order
export default function defineAssociations() {
  User.hasMany(Order, { foreignKey: "user_id", as: "orders" });
  Order.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // Medication and Order
  Medication.hasMany(Order, { foreignKey: "medication_id", as: "orders" });
  Order.belongsTo(Medication, {
    foreignKey: "medication_id",
    as: "medication",
  });

  // Delivery Partner and Order
  DeliveryPartner.hasMany(Order, {
    foreignKey: "delivery_partner_id",
    as: "orders",
  });
  Order.belongsTo(DeliveryPartner, {
    foreignKey: "delivery_partner_id",
    as: "deliveryPartner",
  });
}
