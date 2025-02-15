import styled from "styled-components";
import Upper from "../atom/Upper";
import Lower from "../atom/Lower";

const Container = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  background-color: white;
  overflow: hidden;
`;

const Content = ({ img, signBody }) => {
  return (
    <Container>
      <Upper img={img} signBody={signBody} />
      <Lower />
    </Container>
  );
};

export default Content;
