import styled from "styled-components";
import Content from "../component/Content";
import useFetchSubCategories from "../hooks/useFetchSubCategories";

const BodyContainer = styled.div`
  width: 50%;
  margin-top: 20px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  font-size: 18px;
  font-weight: bold;
`;

const Body = ({ activeButton, categoryId }) => {
  const { selectedData } = useFetchSubCategories(categoryId, activeButton); // 수정된 훅 사용
  console.log("현재 버튼 : ", activeButton);
  console.log("현재 카테고리 : ", categoryId);
  console.log("현재 데이터 : ", selectedData);
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

export default Body;
