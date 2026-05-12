import { adminRequest } from "../api/apiAdminRequest";

export const registeredUserService = {
  getUsers: async () => {
    const res = await adminRequest("/api/admin/registered-users/");
    return res;
  },
};
