import { useState } from "react";
import PropTypes from "prop-types";
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

const Button = ({ imageOff, imageOn, text }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <ButtonStyled onClick={() => setIsOn((prev) => !prev)}>
      <Image src={isOn ? imageOn : imageOff} alt={text} />
      <Text>{text}</Text>
    </ButtonStyled>
  );
};

Button.propTypes = {
  imageOff: PropTypes.string.isRequired,
  imageOn: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
