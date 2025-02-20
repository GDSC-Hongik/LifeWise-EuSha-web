import styled from "styled-components";
import Content from "../component/Content";
import { useState, useEffect } from "react";
import axios from "axios"; // axios 추가

const BodyContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const LaundryBody = ({ activeButton }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  // 서브 카테고리 목록 불러오기
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "https://life-wise.site/categories/2/subcategories"
        );
        setSubCategories(response.data.subCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  // 선택된 서브 카테고리에 대한 데이터 불러오기
  useEffect(() => {
    const fetchSelectedData = async () => {
      if (!activeButton || subCategories.length === 0) {
        setSelectedData([]); // 조건이 맞지 않으면 빈 배열로 초기화
        return;
      }

      const matchedSubCategory = subCategories.find(
        (sub) => sub.subCategoryId === activeButton
      );

      if (matchedSubCategory) {
        try {
          const response = await axios.get(
            `https://life-wise.site/categories/2/subcategories/${matchedSubCategory.subCategoryId}`
          );
          setSelectedData(response.data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      } else {
        setSelectedData([]); // activeButton과 일치하는 데이터가 없을 경우 초기화
      }
    };

    fetchSelectedData();
  }, [activeButton, subCategories]);

  return (
    <BodyContainer>
      {selectedData.length > 0 ? (
        selectedData.map((item) => (
          <Content
            key={item.id}
            id={item.id}
            imageUrl={
              item.imageUrl.startsWith("http")
                ? item.imageUrl
                : `https://life-wise.site${item.imageUrl}`
            }
            description={item.description}
          />
        ))
      ) : (
        <p>해당 카테고리에 대한 데이터가 없습니다.</p>
      )}
    </BodyContainer>
  );
};

export default LaundryBody;
