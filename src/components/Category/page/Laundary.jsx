import styled from "styled-components";
import { useState } from "react";

import ButtonBar from "../block/ButtonBar";
import HeaderMain from "../../Header";
import LaundryBody from "../block/laundryBody";
import Header from "../block/Header";
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
      <HeaderMain />
      <Header />
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
