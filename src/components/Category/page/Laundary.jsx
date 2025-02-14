import styled from "styled-components";
import { useState } from "react";

import ButtonBar from "../block/ButtonBar";
import Header from "../block/Header";
import Body from "../block/Body";
// import Content from "../component/Content";

const LaundryContainer = styled.div`
  position: relative;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Laundry = () => {
  const [activeButton, setActiveButton] = useState(1);
  return (
    <LaundryContainer>
      <style>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Header />
      <ButtonBar
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
      {/* <Body activeButton={activeButton} /> */}
      <Body />
    </LaundryContainer>
  );
};

export default Laundry;
