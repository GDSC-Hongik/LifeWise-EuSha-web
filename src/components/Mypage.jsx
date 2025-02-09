import { useState } from "react";
import "./Mypage.css";
import Header from "./Header";
import Account from "./Mypage_Ingredient/Account";
import Likes from "./Mypage_Ingredient/Likes"; // 추가

const Mypage = () => {
  const [selectedMenu, setSelectedMenu] = useState("account"); // 기본값 설정

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
      <Header />
      <div className="mypage-body">
        {/* 사이드바 */}
        <aside className="sidebar">
          <ul>
            <li
              className="first-list"
              onClick={() => setSelectedMenu("account")} // 상태 업데이트
            >
              계정 관리
            </li>
            <li onClick={() => setSelectedMenu("likes")}>좋아요</li>
          </ul>
        </aside>

        {/* 오른쪽 컨텐츠 변경 */}
        <main className="mypage-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Mypage;
