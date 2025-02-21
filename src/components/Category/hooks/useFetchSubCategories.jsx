// src/hooks/useFetchSubCategories.js
import { useState, useEffect } from "react";
import API_ENDPOINTS from "../data/PageLinks";
import fetchData from "../data/fetchData";

const useFetchSubCategories = (categoryId) => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const loadSubCategories = async () => {
      if (!API_ENDPOINTS[`CATEGORY_${categoryId}`]) return;

      const data = await fetchData(
        API_ENDPOINTS[`CATEGORY_${categoryId}`].SUBCATEGORIES
      );
      if (data) setSubCategories(data.subCategories);
    };

    loadSubCategories();
  }, [categoryId]);

  return subCategories;
};

export default useFetchSubCategories;
