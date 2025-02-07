import styled from "styled-components";

const LaundryContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  background-color: #f8f8f8;
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const Laundary = () => {
  return (
    <LaundryContainer>
      <Header>
        <Logo>LifeWise</Logo>
      </Header>
    </LaundryContainer>
  );
};

export default Laundary;
