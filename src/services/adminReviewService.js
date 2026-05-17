import { adminRequest } from "../api/apiAdminRequest";

// ================= ADMIN REVIEW SERVICE =================
export const adminReviewService = {
  // CREATE FAKE REVIEW
  createFakeReview: (productId, formData) =>
    adminRequest(`/products/${productId}/admin/reviews/create/`, {
      method: "POST",
      body: formData,
    }),

  // GET ALL REVIEWS
  getAllReviews: () =>
    adminRequest("/api/admin/reviews/", {
      method: "GET",
    }),
};
