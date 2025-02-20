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

const Content = ({ id, imageUrl, description }) => {
  console.log("Content 컴포넌트에 전달된 imgUrl : ", imageUrl);
  return (
    <Container>
      <Upper id={id} imageUrl={imageUrl} description={description} />
      <Lower />
    </Container>
  );
};

export default Content;
