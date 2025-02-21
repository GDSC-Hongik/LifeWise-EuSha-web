import styled from "styled-components";
import Upper from "./Upper";
import Lower from "./Lower";

const Container = styled.div`
  position: relative;
  width: 220px; // 너비를 100%로 설정하여 부모 요소에 맞춤
  height: 220px;
  background-color: white;
  overflow: hidden;
`;

const Content = ({ id, imageUrl, description }) => {
  return (
    <Container>
      <Upper id={id} imageUrl={imageUrl} description={description} />
      <Lower />
    </Container>
  );
};

export default Content;
