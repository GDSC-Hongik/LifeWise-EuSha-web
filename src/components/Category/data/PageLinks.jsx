const BASE_URL = "https://life-wise.site";

const API_ENDPOINTS = {
  CATEGORY_1: {
    SUBCATEGORIES: `${BASE_URL}/categories/1/subcategories`,
    SUBCATEGORIE_ALL: `${BASE_URL}/categories/1/subcategories/all`,
    SUBCATEGORY_DETAILS: (subCategoryId) =>
      `${BASE_URL}/categories/1/subcategories/${subCategoryId}`,
  },
  CATEGORY_2: {
    SUBCATEGORIES: `${BASE_URL}/categories/2/subcategories`,
    SUBCATEGORIE_ALL: `${BASE_URL}/categories/2/subcategories/all`,
    SUBCATEGORY_DETAILS: (subCategoryId) =>
      `${BASE_URL}/categories/2/subcategories/${subCategoryId}`,
  },
  CATEGORY_3: {
    SUBCATEGORIES: `${BASE_URL}/categories/3/subcategories`,
    SUBCATEGORIE_ALL: `${BASE_URL}/categories/3/subcategories/all`,
    SUBCATEGORY_DETAILS: (subCategoryId) =>
      `${BASE_URL}/categories/3/subcategories/${subCategoryId}`,
  },
};

export default API_ENDPOINTS;
