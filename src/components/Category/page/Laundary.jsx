import styled from "styled-components";

import ButtonBar from "../block/ButtonBar";
import Header from "../block/Header";
import Body from "../block/Body";

const LaundryContainer = styled.div`
  position: relative;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Laundry = () => {
  return (
    <LaundryContainer>
      {/* <style>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style> */}
      <Header />
      <ButtonBar />
      <Body />
    </LaundryContainer>
  );
};

export default Laundry;
