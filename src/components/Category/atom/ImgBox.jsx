import styled from "styled-components";

const ImageSize = styled.img`
  width: 90px;
  height: 148px;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: filter 0.3s ease;
`;

const ImgBox = ({ img }) => {
  return <ImageSize src={img} className="img-box" alt="Laundry Icon" />;
};

export default ImgBox;
