import styled from "styled-components";

const TextOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2; /* ImgBox 위에 표시 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  opacity: 0; /* 초기 상태는 숨김 */
  visibility: hidden; /* 초기 상태는 숨김 */
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 부드러운 전환 효과 */

  /* UpperContainer:hover 시 TextOverlayContainer 표시 */
  .upper-container:hover & {
    /* &는 TextOverlayContainer 자신을 가리킴 */
    opacity: 1;
    visibility: visible;
  }
`;

const TextOverlay = ({ text }) => {
  return <TextOverlayContainer>{text}</TextOverlayContainer>;
};

export default TextOverlay;
