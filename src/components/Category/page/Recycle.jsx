import styled from "styled-components";
import { useState } from "react";

import ButtonBar from "../block/ButtonBar";
import HeaderMain from "../../Header";
import RecycleBody from "../block/RecycleBody";

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
      <ButtonBar
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        index={12}
      />
      <RecycleBody activeButton={activeButton} />
    </Container>
  );
};

export default Recycle;
