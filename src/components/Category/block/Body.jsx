import styled from "styled-components";
import LaundryData from "../data/LaundryData";
import Content from "../component/Content";

const BodyContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Body = ({ activeButton }) => {
  // activeButton과 subCategoryID가 같은 데이터 필터링

  const filteredData = LaundryData.filter(
    (item) => item.subCategoryID === activeButton
  );

  return (
    <BodyContainer>
      {filteredData.map((item) => (
        <Content key={item.id} img={item.img} signBody={item.signBody} />
      ))}
    </BodyContainer>
  );
};

export default Body;
