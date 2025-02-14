import styled from "styled-components";
import Img from "../../../assets/LaundryData/water1.svg";

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

const ImageBox = () => {
  return <ImageSize src={Img} className="img-box" />;
};

export default ImageBox;
