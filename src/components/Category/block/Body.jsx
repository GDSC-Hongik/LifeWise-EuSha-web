import styled from "styled-components";
// import LaundryData from "../data/LaundryData";
import Content from "../component/Content";

const BodyContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-wrap: wrap; /* 내용이 넘치면 다음 줄로 넘기기 */
  gap: 20px; /* Content 컴포넌트 사이 간격 */
`;

// const Body = ({ activeButton }) => {
//   return (
//     <BodyContainer>
//       {activeButton ? LaundryData[activeButton] : ""}

//     </BodyContainer>
//   );
// };

// export default Body;

const Body = () => {
  const contentCount = 6; // Content 컴포넌트 개수

  return (
    <BodyContainer>
      {Array.from({ length: contentCount }, (_, i) => (
        <Content key={i} />
      ))}
    </BodyContainer>
  );
};

export default Body;
