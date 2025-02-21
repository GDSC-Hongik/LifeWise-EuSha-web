import styled from "styled-components";
import { useState } from "react";
// ImgBox.jsx 수정

const ImageWrapper = styled.div`
  position: absolute; // 추가
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  max-width: 180px;
  height: 120px;
  max-height: 180px;
`;

const StyledImage = styled.img`
  display: block; // 추가
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: auto; // 추가
`;

const ImgBox = ({ imageUrl }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <ImageWrapper>
      {imageError ? (
        <p>이미지를 로드할 수 없습니다.</p>
      ) : (
        <StyledImage
          src={imageUrl}
          alt="로딩되지 않은 이미지"
          onError={handleImageError}
        />
      )}
    </ImageWrapper>
  );
};

export default ImgBox;
