import styled from "styled-components";

const ButtonStyled = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;

const Image = styled.img`
  width: 88px;
  height: 88px;
  /* transition: transform 0.3s ease; */
`;

const Text = styled.span`
  margin-top: 8px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const Button = ({ imageOff, imageOn, text, isActive, onClick }) => {
  return (
    <ButtonStyled onClick={onClick}>
      <Image src={isActive ? imageOn : imageOff} alt={text} />
      <Text>{text}</Text>
    </ButtonStyled>
  );
};

export default Button;
