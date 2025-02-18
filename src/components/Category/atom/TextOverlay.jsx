import styled from "styled-components";

const TextOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: black;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;

  .upper-container:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const TextOverlay = ({ signBody }) => {
  return (
    <TextOverlayContainer>
      {signBody.map((signBody, index) => (
        <div key={index} style={{ textAlign: "left" }}>
          {signBody}
        </div> // 각 요소의 텍스트 왼쪽 정렬
      ))}
    </TextOverlayContainer>
  );
};

export default TextOverlay;
