import { useState } from "react";
import {
  LaundryContainer,
  Banner,
  Title,
  Description,
  SearchInput,
  ButtonContainer,
  SvgButton,
  Content,
} from "./LaundryCss";
import Header from "./Header";

import {
  Entire,
  EntireActive,
  Water,
  WaterActive,
  Dry,
  DryActive,
  Steam,
  SteamActive,
  White1,
  White1Active,
  DryCleaning,
  DryCleaningActive,
} from "./LandryImage";

const Laundry = () => {
  const [activeButton, setActiveButton] = useState("전체보기");

  const content = {
    전체보기: {
      물세탁: "물세탁",
      표백제: "표백제",
      건조: "건조",
      다림질: "다림질",
      드라이클리닝: "드라이클리닝",
    },
    물세탁: {
      물세탁: "물세탁",
    },
    표백제: {
      표백제: "표백제",
    },
    건조: {
      건조: "건조",
    },
    다림질: {
      다림질: "다림질",
    },
    드라이클리닝: {
      드라이클리닝: "드라이클리닝",
    },
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <LaundryContainer>
      <Header />
      <Banner>
        <Title>손쉬운 세탁법</Title>
        <Description>
          표기되어있는 세탁기호 명확히 알고, 손쉽게 세탁하자!
        </Description>
        <SearchInput
          type="text"
          placeholder="찾고 싶은 세탁법을 검색해주세요"
        />
      </Banner>

      <ButtonContainer>
        {/* 전체보기 버튼 */}
        <SvgButton
          onClick={() => handleClick("전체보기")}
          active={activeButton === "전체보기"}
        >
          <img
            src={activeButton === "전체보기" ? EntireActive : Entire}
            alt="전체보기"
          />
        </SvgButton>
        <SvgButton
          onClick={() => handleClick("물세탁")}
          active={activeButton === "물세탁"}
        >
          <img
            src={activeButton === "물세탁" ? WaterActive : Water}
            alt="물세탁"
          />
        </SvgButton>
        <SvgButton
          onClick={() => handleClick("표백제")}
          active={activeButton === "표백제"}
        >
          <img
            src={activeButton === "표백제" ? White1Active : White1}
            alt="표백제"
          />
        </SvgButton>
        <SvgButton
          onClick={() => handleClick("건조")}
          active={activeButton === "건조"}
        >
          <img src={activeButton === "건조" ? DryActive : Dry} alt="건조" />
        </SvgButton>
        <SvgButton
          onClick={() => handleClick("다림질")}
          active={activeButton === "다림질"}
        >
          <img
            src={activeButton === "다림질" ? SteamActive : Steam}
            alt="다림질"
          />
        </SvgButton>
        <SvgButton
          onClick={() => handleClick("드라이클리닝")}
          active={activeButton === "드라이클리닝"}
        >
          <img
            src={
              activeButton === "드라이클리닝" ? DryCleaningActive : DryCleaning
            }
            alt="드라이클리닝"
          />
        </SvgButton>
      </ButtonContainer>

      <Content>
        {Object.entries(content[activeButton]).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </Content>
    </LaundryContainer>
  );
};

export default Laundry;
