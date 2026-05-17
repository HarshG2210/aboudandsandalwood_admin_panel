import { adminRequest } from "../api/apiAdminRequest";

// ==========================================
// GET HERO SECTION
// ==========================================

export const getHeroSections = () => {
  return adminRequest("/hero-sections/", {
    method: "GET",
  });
};

// ==========================================
// CREATE HERO SECTION
// ==========================================

export const createHeroSection = (formData) => {
  return adminRequest("/hero-sections/", {
    method: "POST",
    body: formData,
  });
};

// ==========================================
// UPDATE HERO SECTION
// ==========================================

export const updateHeroSection = (formData) => {
  return adminRequest("/hero-sections/", {
    method: "PUT",
    body: formData,
  });
};