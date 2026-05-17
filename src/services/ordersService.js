import { adminRequest } from "../api/apiAdminRequest";

export const ordersService = {
  // ================= GET ORDERS =================
  getOrders: () => adminRequest("/orders/"),

  // ================= UPDATE STATUS =================
  updateOrderStatus: ({ orderId, status }) =>
    adminRequest(`/orders/${orderId}/update_status/`, {
      method: "PATCH",

      body: {
        status,
      },
    }),
};
