import styled from "styled-components";
import Upper from "../atom/Upper";
import Lower from "../atom/Lower";

const Container = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  background-color: white;
  overflow: hidden;
  /* border: solid; */
`;

const Content = () => {
  return (
    <Container>
      <Upper />
      <Lower />
    </Container>
  );
};

export default Content;
