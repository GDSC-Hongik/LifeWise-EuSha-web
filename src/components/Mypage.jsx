import { useState } from "react";
import { Link } from "react-router-dom";
import "./Mypage.css";
import Account from "./Mypage_Ingredient/Account";
import Likes from "./Mypage_Ingredient/Likes"; // 추가
import API from "../api/axiosInstance";

const Mypage = () => {
  const [selectedMenu, setSelectedMenu] = useState("account"); // 기본값 설정

  const handleMenuClick = async (menu) => {
    setSelectedMenu(menu);

    if (menu === "likes") {
      try {
        const response = await API.get("https://life-wise.site/likes");

        console.log("라이크 응답: ", response.data);
        localStorage.setItem("likes", JSON.stringify(response.data.likes));
      } catch (error) {
        console.error("좋아요 요청 실패", error);
      }
    }
  };

  const renderContent = () => {
    console.log("현재 선택된 메뉴:", selectedMenu); // 상태 변경 확인
    switch (selectedMenu) {
      case "account":
        return <Account />;
      case "likes":
        return <Likes />; // 새로운 메뉴 추가
      default:
        return <Account />;
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-logo">
        <Link to="/">LifeWise</Link>
      </div>

      <div className="mypage-body">
        {/* 사이드바 */}
        <div className="sidebar">
          <ul>
            <li
              className={selectedMenu === "account" ? "selected" : ""}
              onClick={() => handleMenuClick("account")}
            >
              내 계정 관리
            </li>
            <li
              className={selectedMenu === "likes" ? "selected" : ""}
              onClick={() => handleMenuClick("likes")}
            >
              내 좋아요 목록
            </li>
          </ul>
        </div>

        {/* 오른쪽 컨텐츠 변경 */}
        <main className="mypage-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Mypage;
