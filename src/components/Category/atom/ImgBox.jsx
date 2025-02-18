import styled from "styled-components";

const ImageSize = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: filter 0.3s ease;
`;

const ImgBox = ({ img }) => {
  return <ImageSize src={img} alt="Laundry Icon" />;
};

export default ImgBox;
