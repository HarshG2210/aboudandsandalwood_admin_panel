import { adminRequest } from "../api/apiAdminRequest";

export const pendingUserService = {
  getPendingUsers: async () => {
    const res = await adminRequest("/api/admin/pending-users");
    return res;
  },
};
