import styled from "styled-components";

const Text = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
  color: black;
`;

const ContentHead = () => {
  return <Text>이것은 이미지 설명입니다.</Text>;
};

export default ContentHead;
