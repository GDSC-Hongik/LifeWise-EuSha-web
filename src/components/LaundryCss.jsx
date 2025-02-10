import styled from "styled-components";
import LaundryBanner from "../assets/Laundry/LaundryBanner.jpg";

export const LaundryContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  background-color: #f8f8f8;
`;

export const Logo = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

export const LaundryBG = styled.img.attrs({
  src: LaundryBanner,
})`
  width: 100%;
  height: 50%;
`;
