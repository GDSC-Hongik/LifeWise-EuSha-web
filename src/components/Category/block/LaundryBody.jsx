import styled from "styled-components";
import Content from "../component/Content";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("https://life-wise.site/categories/2/subcategories")
      .then((res) => res.json())
      .then((data) => {
        setSubCategories(data.subCategories);
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, []);

  useEffect(() => {
    if (activeButton && subCategories.length > 0) {
      const matchedSubCategory = subCategories.find(
        (sub) => sub.subCategoryId === activeButton
      );

      if (matchedSubCategory) {
        fetch(
          `https://life-wise.site/categories/2/subcategories/${matchedSubCategory.subCategoryId}`
        )
          .then((res) => res.json())
          .then((data) => {
            setSelectedData(data);
          })
          .catch((err) => console.error("Error fetching details:", err));
      } else {
        setSelectedData([]); // activeButton에 맞는 데이터가 없을 경우 빈 배열로 초기화
      }
    }
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
