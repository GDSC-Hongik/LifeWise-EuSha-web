import styled from "styled-components";
import LaundryBanner from "../assets/Laundry/LaundryBanner.jpg";

export const LaundryContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Banner = styled.div`
  background-image: url(${LaundryBanner});
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 353px;
`;

export const Title = styled.div`
  position: relative;
  top: 100px;
  color: white;
  font-size: 32px;
  font-weight: bold;
`;

export const Description = styled.div`
  position: relative;
  top: 105px;
  font-size: 1.2rem;
  color: white;
`;

export const SearchInput = styled.input`
  width: 80%;
  max-width: 400px;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  position: relative;
  top: 120px;
`;

/* 버튼을 감싸는 컨테이너 */
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 0px 50px;
`;

/* 버튼 스타일 */
export const StyledButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0; /* 버튼 크기를 이미지에 맞춤 */

  img {
    width: 88px; /* 이미지 크기에 맞춤 */
    height: 88px;
    transition: opacity 0.3s ease;
  }

  &:hover img {
    content: url("../assets/Entire_choose.png"); /* 호버 시 이미지 변경 */
  }

  ${(props) =>
    props.active &&
    `
    img {
      content: url("../assets/Entire_choose.png"); /* 클릭 시 이미지 변경 */
    }
  `}
`;

export const Content = styled.p`
  padding: 20px;
  margin-top: 20px;
  margin-left: 20px;
  /* border: 1px solid #eee; */
  /* border-radius: 5px; */
  text-align: left;
`;
export const SvgButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 88px;
    height: 88px;
    transition: opacity 0.3s ease;
  }

  &:hover img {
    content: url(${(props) => props.imgActive}); /* 호버 시 변경 */
  }

  ${(props) =>
    props.active &&
    `
    img {
      content: url(${props.imgActive}); /* 클릭 시 변경 */
    }
  `}
`;
