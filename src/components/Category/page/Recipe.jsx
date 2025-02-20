import styled from "styled-components";
import { useState } from "react";

import ButtonBar from "../block/ButtonBar";
import HeaderMain from "../../Header";
import RecipeBody from "../block/RecipeBody";

const Container = styled.div`
  position: relative;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Recipe = () => {
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
        index={18}
      />
      <RecipeBody activeButton={activeButton} />
    </Container>
  );
};

export default Recipe;
