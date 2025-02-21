import { useState, useEffect } from "react";
import API_ENDPOINTS from "../data/PageLinks";
import fetchData from "../data/fetchData";

const useFetchSubCategoryDetails = (
  categoryId,
  activeButton,
  subCategories
) => {
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const loadSubCategoryDetails = async () => {
      if (
        !activeButton ||
        subCategories.length === 0 ||
        !API_ENDPOINTS[`CATEGORY_${categoryId}`]
      )
        return;

      const matchedSubCategory = subCategories.find(
        (sub) => sub.subCategoryId === activeButton
      );

      if (matchedSubCategory) {
        const data = await fetchData(
          API_ENDPOINTS[`CATEGORY_${categoryId}`].SUBCATEGORY_DETAILS(
            matchedSubCategory.subCategoryId
          )
        );
        if (data) setSelectedData(data);
      } else {
        setSelectedData([]);
      }
    };

    loadSubCategoryDetails();
  }, [activeButton, subCategories, categoryId]);

  return selectedData;
};

export default useFetchSubCategoryDetails;
