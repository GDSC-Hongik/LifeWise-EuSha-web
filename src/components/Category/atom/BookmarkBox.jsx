import styled from "styled-components";
import { Bookmark } from "lucide-react";
import { useState } from "react";

const StyledBookmark = styled(Bookmark)`
  position: absolute;
  top: 12%;
  left: 88%;
  transform: translate(-50%, -50%);
  width: 18%;
  height: 18%;
  cursor: pointer;
  z-index: 3;
`;

const BookmarkBox = () => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleBookmark = () => {
    setIsFilled((prev) => !prev);
  };

  return (
    <StyledBookmark
      onClick={toggleBookmark}
      fill={isFilled ? "black" : "none"}
      stroke="black"
    />
  );
};

export default BookmarkBox;
