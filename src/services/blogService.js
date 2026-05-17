import { adminRequest } from "../api/apiAdminRequest";

export const blogService = {
  createBlog: (formData) =>
    adminRequest("/blogs/", {
      method: "POST",
      body: formData,
    }),
};
