import "./Account.css";
import Profile from "../../assets/Image.png";
import { useState } from "react";

const Account = () => {
  const [memberName, setmemberName] = useState("");
  const [password, setPassword] = useState("");

  const handlememberName = () => {
    const newName = prompt("새로운 이름을 입력하세요: ", memberName);
    setmemberName(newName);
  };

  const handlePassword = () => {
    const newPassword = prompt("새로운 비밀번호를 입력하세요: ", password);
    setPassword(newPassword);
  };

  return (
    <div className="account-container">
      <h1 className="account-title">내 계정 관리</h1>

      {/* 프로필 정보 */}
      <section className="profile-section">
        <h2>내 프로필</h2>
        <img src={Profile} alt="프로필 사진"></img>
        <h3>{memberName}</h3>
        <p>서버로부터 받아온 이메일</p>
        <button onClick={handlememberName} className="profile-btn">
          이름 변경
        </button>
      </section>

      {/* 비밀번호 변경 */}
      <section className="password-section">
        <h2>비밀번호</h2>
        <button onClick={handlePassword} className="password-btn">
          비밀번호 변경
        </button>
      </section>
    </div>
  );
};

export default Account;
