import styled from "styled-components";
import LaundryData from "../data/LaundryData";

const BodyContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const Body = ({ activeButton }) => {
  return (
    <BodyContainer>
      {activeButton ? LaundryData[activeButton] : ""}
    </BodyContainer>
  );
};

export default Body;
