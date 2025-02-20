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

const RecycleBody = ({ activeButton }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    fetch("https://life-wise.site/categories/2/subcategories")
      .then((res) => res.json())
      .then((data) => {
        console.log("API 응답 데이터:", data);
        setSubCategories(data.subCategories);
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, []);

  useEffect(() => {
    console.log("현재 subCategories:", subCategories);
    console.log("현재 activeButton:", activeButton);

    if (activeButton && subCategories.length > 0) {
      const matchedSubCategory = subCategories.find(
        (sub) => sub.subCategoryId === activeButton
      );

      console.log("찾은 subCategory:", matchedSubCategory);

      if (matchedSubCategory) {
        fetch(
          `https://life-wise.site/categories/2/subcategories/${matchedSubCategory.subCategoryId}`
        )
          .then((res) => res.json())
          .then((data) => {
            setSelectedData(data);
            console.log("불러온 데이터:", data);
          })
          .catch((err) => console.error("Error fetching details:", err));
      } else {
        setSelectedData([]); // activeButton에 맞는 데이터가 없을 경우 빈 배열로 초기화
      }
    }
  }, [activeButton, subCategories]);

  // selectedData 변경 시마다 로그 출력
  useEffect(() => {
    console.log("selectedData 변경:", selectedData);
    if (selectedData.length > 0) {
      console.log("첫 번째 데이터의 이미지 URL:", selectedData[0].imageUrl);
    }
  }, [selectedData]);

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

export default RecycleBody;
