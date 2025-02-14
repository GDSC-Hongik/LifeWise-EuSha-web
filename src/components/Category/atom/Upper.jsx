import styled from "styled-components";
import ImgBox from "../atom/ImgBox";
import BookmarkBox from "../atom/BookmarkBox";
import TextOverlay from "../atom/TextOverlay"; // TextOverlay 컴포넌트 import

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

  /* TextOverlay가 UpperContainer:hover에 의해 보이게 됨 */
`;

const Upper = () => {
  return (
    <UpperContainer className="upper-container">
      {" "}
      {/* upper-container 클래스 추가 */}
      <BookmarkBox />
      <ImgBox />
      <TextOverlay
        text="
      테스트입니다\n 
      테스트입니다\n 
      테스트 입니다 
      테스트 입니다"
      />{" "}
      {/* TextOverlay 컴포넌트 사용 */}
    </UpperContainer>
  );
};

export default Upper;
