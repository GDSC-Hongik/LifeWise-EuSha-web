import styled from "styled-components";
import ImgBox from "../atom/ImgBox";
import BookmarkBox from "../atom/BookmarkBox";
import TextOverlay from "../atom/TextOverlay";

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

const Upper = ({ imageUrl, description }) => {
  console.log("현제 데이터 description : ", description);
  return (
    <UpperContainer className="upper-container">
      <BookmarkBox />
      <ImgBox imageUrl={imageUrl} />
      <TextOverlay description={description} />
    </UpperContainer>
  );
};

export default Upper;
