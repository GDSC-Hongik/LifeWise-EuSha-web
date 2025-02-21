import styled from "styled-components";
import BookmarkBox from "../atom/BookmarkBox";
import TextOverlay from "../atom/TextOverlay";
import { useState } from "react";
import PropTypes from "prop-types";

const UpperContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  background-color: white;
  border: solid;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: auto;
  top: 10px;
  user-select: none;

  &:hover .img-box {
    filter: blur(4px);
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const Upper = ({ id, imageUrl, description }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <UpperContainer className="upper-container">
      <BookmarkBox id={id} />
      {imageError ? (
        <p>이미지를 로드할 수 없습니다.</p>
      ) : (
        <StyledImage
          src={imageUrl}
          alt="로딩되지 않은 이미지"
          onError={handleImageError}
        />
      )}
      <TextOverlay description={description} />
    </UpperContainer>
  );
};

Upper.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Upper;
