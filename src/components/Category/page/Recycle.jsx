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
`;

const Recycle = () => {
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
        index={12}
      />
      <Body activeButton={activeButton} categoryId={1} />
    </Container>
  );
};

export default Recycle;
