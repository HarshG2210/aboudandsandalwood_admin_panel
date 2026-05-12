import { adminRequest } from "../api/apiAdminRequest";

export const ordersService = {
  getOrders: () => adminRequest("/orders/"),
};
