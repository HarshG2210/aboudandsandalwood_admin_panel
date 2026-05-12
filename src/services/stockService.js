import { adminRequest } from "../api/apiAdminRequest";

export const stockService = {
  getStockHistory: () => adminRequest("/stock-logs/"),
};
