import ButtonData from "../data/ButtonData";
import Button from "../component/Button";
import styled from "styled-components";

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 0px 50px;
`;

const ButtonBar = () => {
  return (
    <ButtonContainer>
      {ButtonData.map(({ id, imageOff, imageOn, text }) => (
        <Button key={id} imageOff={imageOff} imageOn={imageOn} text={text} />
      ))}
    </ButtonContainer>
  );
};
export default ButtonBar;
