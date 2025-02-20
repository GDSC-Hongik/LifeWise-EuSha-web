import styled from "styled-components";

const CountText = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

const LikeCount = ({ count }) => {
  return <CountText>{count}</CountText>;
};

export default LikeCount;
