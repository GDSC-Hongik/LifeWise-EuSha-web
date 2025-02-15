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

const ButtonBar = ({ activeButton, setActiveButton }) => {
  const handleButtonClick = (id) => {
    setActiveButton((prev) => (prev === id ? null : id));
  };
  return (
    <ButtonContainer>
      {ButtonData.map(({ id, imageOff, imageOn, text }) => (
        <Button
          key={id}
          id={id}
          imageOff={imageOff}
          imageOn={imageOn}
          text={text}
          isActive={activeButton === id}
          onClick={() => handleButtonClick(id)}
        />
      ))}
    </ButtonContainer>
  );
};
export default ButtonBar;
