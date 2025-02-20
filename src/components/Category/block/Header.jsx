import styled from "styled-components";
import LaundryBanner from "../../../assets/LaundryBanner.jpg";

const Banner = styled.div`
  background-image: url(${LaundryBanner});
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 353px;
`;

const Title = styled.div`
  position: relative;
  top: 100px;
  color: white;
  font-size: 32px;
  font-weight: bold;
`;

const Description = styled.div`
  position: relative;
  top: 105px;
  font-size: 1.2rem;
  color: white;
`;

const SearchInput = styled.input`
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

const Header = () => {
  return (
    <Banner>
      <Title>손쉬운 세탁법</Title>
      <Description>
        표기되어있는 세탁기호 명확히 알고, 손쉽게 세탁하자!
      </Description>
      <SearchInput type="text" placeholder="찾고 싶은 세탁법을 검색해주세요" />
    </Banner>
  );
};

export default Header;
