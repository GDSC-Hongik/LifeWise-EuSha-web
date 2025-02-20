import styled from "styled-components";

// const ImageSize = styled.img`
//   /* width: 100%;
//   height: 100%;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 2;
//   transition: filter 0.3s ease; */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 180px; /* 부모 요소 크기 */
//   height: 180px;
// `;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* 부모 크기에 맞춤 */
  max-width: 180px;
  height: auto;
  max-height: 180px;
  overflow: hidden; /* 이미지가 넘칠 경우 잘림 */
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ImgBox = ({ imageUrl }) => {
  console.log("ImgBox imageUrl : ", imageUrl);
  return (
    <ImageWrapper>
      <StyledImage src={imageUrl} alt="로딩되지 않은 이미지" />
    </ImageWrapper>
  );
};

export default ImgBox;
