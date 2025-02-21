import { useState } from "react";
import styled from "styled-components";
// import ContentHead from "../atom/ContentHead";
import LikeButton from "../atom/LikeButton";
import LikeCount from "../atom/LikeCount";

const LowerContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  padding: 8px 0;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
  left: 10%;
  top: 2px;
`;

const Lower = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(77);

  const toggleLike = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <LowerContainer>
      {/* <ContentHead /> */}
      <LikeContainer>
        <LikeButton liked={liked} onToggle={toggleLike} />
        <LikeCount count={count} />
      </LikeContainer>
    </LowerContainer>
  );
};

export default Lower;
