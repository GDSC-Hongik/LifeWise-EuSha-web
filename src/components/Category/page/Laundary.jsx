import styled from "styled-components";
import { useState } from "react";

import ButtonBar from "../block/ButtonBar";
import HeaderMain from "../../Header";
import LaundryBody from "../block/LaundryBody";
// import Content from "../component/Content";

const Container = styled.div`
  position: relative;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
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
      <HeaderMain></HeaderMain>
      <HeaderMain />
      <ButtonBar
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        index={6}
      />
      <LaundryBody activeButton={activeButton} />
    </Container>
  );
};

export default Laundry;
