import { adminRequest } from "../api/apiAdminRequest";

export const contactAdminService = {
  getAllContacts: () =>
    adminRequest("/api/admin/contact-us/", {
      method: "GET",
    }),
};
