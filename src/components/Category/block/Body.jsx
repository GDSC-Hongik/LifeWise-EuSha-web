import styled from "styled-components";
import Content from "../component/Content";
import useFetchSubCategories from "../hooks/useFetchSubCategories"; // 서브 카테고리 가져오는 훅
import useFetchSubCategoryDetails from "../hooks/useFetchSubCategoryDetails"; // 상세 정보 가져오는 훅

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
  const subCategories = useFetchSubCategories(categoryId); // 서브 카테고리 목록 가져오기
  const selectedData = useFetchSubCategoryDetails(
    categoryId,
    activeButton,
    subCategories
  ); // 선택된 서브 카테고리의 상세 정보 가져오기

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
