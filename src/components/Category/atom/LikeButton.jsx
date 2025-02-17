import { Heart } from "lucide-react";
import styled from "styled-components";

const LikeButtonStyled = styled.button`
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const LikeButton = ({ liked, onToggle }) => {
  return (
    <LikeButtonStyled onClick={onToggle}>
      <Heart size={20} fill={liked ? "red" : "none"} />
    </LikeButtonStyled>
  );
};

export default LikeButton;
