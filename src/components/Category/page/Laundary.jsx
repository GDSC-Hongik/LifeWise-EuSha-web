import styled from "styled-components";
import { useState } from "react";

import ButtonBar from "../block/ButtonBar";
import HeaderMain from "../../Header";
import Body from "../block/Body";
import Header from "../block/Header";

const Container = styled.div`
  position: relative;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  align-items: center;
`;

const BodyWrapper = styled.div`
  width: 65%; // Body 컴포넌트의 너비에 맞게 설정
  margin: 0 auto;
`;

const Laundry = () => {
  const [activeButton, setActiveButton] = useState(1);
  return (
    <Container>
      <style>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <HeaderMain />
      <Header />
      <ButtonBar
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        index={6}
      />
      <BodyWrapper>
        <Body activeButton={activeButton} categoryId={2} />
      </BodyWrapper>
    </Container>
  );
};

export default Laundry;
