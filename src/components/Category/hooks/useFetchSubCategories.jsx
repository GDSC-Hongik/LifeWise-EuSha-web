// src/hooks/useFetchSubCategories.js
import { useState, useEffect } from "react";
import API_ENDPOINTS from "../data/PageLinks";
import fetchData from "../data/fetchData";

const useFetchSubCategories = (categoryId, activeButton) => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const loadSubCategories = async () => {
      if (!API_ENDPOINTS[`CATEGORY_${categoryId}`]) return;

      if (activeButton === 1 || activeButton === 7 || activeButton === 13) {
        // 전체 보기 버튼 처리
        let targetCategoryId = categoryId;
        if (activeButton === 7) targetCategoryId = 2;
        else if (activeButton === 13) targetCategoryId = 3;

        const allSubCategories = await fetchData(
          API_ENDPOINTS[`CATEGORY_${targetCategoryId}`].SUBCATEGORIE_ALL
        );

        if (allSubCategories) {
          setSelectedData(allSubCategories);
          setSubCategories(
            allSubCategories.map((item) => ({ subCategoryId: item.id }))
          );
        } else {
          setSelectedData([]);
          setSubCategories([]);
        }
      } else if (activeButton) {
        // 다른 버튼 처리
        const data = await fetchData(
          API_ENDPOINTS[`CATEGORY_${categoryId}`].SUBCATEGORIES
        );
        if (data) {
          setSubCategories(data.subCategories);
          const matchedSubCategory = data.subCategories.find(
            (sub) => sub.subCategoryId === activeButton
          );

          if (matchedSubCategory) {
            const detailData = await fetchData(
              API_ENDPOINTS[`CATEGORY_${categoryId}`].SUBCATEGORY_DETAILS(
                matchedSubCategory.subCategoryId
              )
            );
            if (detailData && detailData.imageUrl) {
              setSelectedData([detailData]);
            } else {
              setSelectedData([]);
            }
          } else {
            setSelectedData([]);
          }
        } else {
          setSubCategories([]);
          setSelectedData([]);
        }
      } else {
        setSubCategories([]);
        setSelectedData([]);
      }
    };

    loadSubCategories();
  }, [categoryId, activeButton]);

  return { subCategories, selectedData };
};

export default useFetchSubCategories;
