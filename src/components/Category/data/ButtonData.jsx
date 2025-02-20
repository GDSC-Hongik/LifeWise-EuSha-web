import entireOff from "../../../assets/ButtonImg/Entire.svg";
import entireOn from "../../../assets/ButtonImg/EntireActive.svg";
import waterOff from "../../../assets/ButtonImg/Water.svg";
import waterOn from "../../../assets/ButtonImg/WaterActive.svg";
import dryOff from "../../../assets/ButtonImg/Dry.svg";
import dryOn from "../../../assets/ButtonImg/DryActive.svg";
import steamOff from "../../../assets/ButtonImg/Steam.svg";
import steamOn from "../../../assets/ButtonImg/SteamActive.svg";
import bleachingOff from "../../../assets/ButtonImg/White.svg";
import bleachingOn from "../../../assets/ButtonImg/WhiteActive.svg";
import dryCleanOff from "../../../assets/ButtonImg/DryCleaning.svg";
import dryCleanOn from "../../../assets/ButtonImg/DryCleaningActive.svg";
import electricOff from "../../../assets/ButtonImg/electricOff.svg";
import electricOn from "../../../assets/ButtonImg/electricOn.svg";
import lifeOff from "../../../assets/ButtonImg/lifeOff.svg";
import lifeOn from "../../../assets/ButtonImg/lifeOn.svg";
import kitchenOff from "../../../assets/ButtonImg/kitchenOff.svg";
import kitchenOn from "../../../assets/ButtonImg/kitchenOn.svg";
import interiorOff from "../../../assets/ButtonImg/interiorOff.svg";
import interiorOn from "../../../assets/ButtonImg/interiorOn.svg";
import packagingOff from "../../../assets/ButtonImg/packagingOff.svg";
import packagingOn from "../../../assets/ButtonImg/packagingOn.svg";

const ButtonData = [
  {
    id: 1,
    imageOff: entireOff,
    imageOn: entireOn,
    text: "전체보기",
    isActive: false,
  },
  {
    id: 2,
    imageOff: waterOff,
    imageOn: waterOn,
    text: "물세탁",
    isActive: false,
  },
  {
    id: 3,
    imageOff: bleachingOff,
    imageOn: bleachingOn,
    text: "표백제",
    isActive: false,
  },
  { id: 4, imageOff: dryOff, imageOn: dryOn, text: "건조", isActive: false },
  {
    id: 5,
    imageOff: steamOff,
    imageOn: steamOn,
    text: "다림질",
    isActive: false,
  },
  {
    id: 6,
    imageOff: dryCleanOff,
    imageOn: dryCleanOn,
    text: "드라이클리닝",
    isActive: false,
  },
  {
    id: 7,
    imageOff: entireOff,
    imageOn: entireOn,
    text: "전체보기",
    isActive: false,
  },
  {
    id: 8,
    imageOff: electricOff,
    imageOn: electricOn,
    text: "가전제품",
    isActive: false,
  },
  {
    id: 9,
    imageOff: lifeOff,
    imageOn: lifeOn,
    text: "생활용품",
    isActive: false,
  },
  {
    id: 10,
    imageOff: kitchenOff,
    imageOn: kitchenOn,
    text: "주방용품",
    isActive: false,
  },
  {
    id: 11,
    imageOff: interiorOff,
    imageOn: interiorOn,
    text: "가구/인테리어",
    isActive: false,
  },
  {
    id: 12,
    imageOff: packagingOff,
    imageOn: packagingOn,
    text: "용기/포장재",
    isActive: false,
  },
];

export default ButtonData;
