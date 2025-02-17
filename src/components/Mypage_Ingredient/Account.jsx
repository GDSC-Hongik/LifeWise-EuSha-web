import "./Account.css";
import Profile from "../../assets/Image.png";
import { useState, useEffect } from "react";
import API from "../../api/axiosInstance";

const Account = () => {
  const [memberName, setmemberName] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedmemberName = localStorage.getItem("memberName");
    const storedemail = localStorage.getItem("email");

    if (storedmemberName) setmemberName(storedmemberName);
    if (storedemail) setEmail(storedemail);
  }, []);

  const handleMemberName = async () => {
    try {
      const response = await API.put(
        "https://life-wise.site/members/changeName",
        { memberName: newMemberName }
      );

      if (response.status === 200) {
        const updatedName = response.data.memberName;
        alert("이름 변경 성공!");

        setmemberName(updatedName);
        localStorage.setItem("memberName", updatedName);

        setIsNameModalOpen(false);
        setNewMemberName("");
      }
    } catch (error) {
      console.error("이름 변경 실패", error);
      alert("이름 변경 실패");
    }
  };

  const handlePassword = async () => {
    try {
      const response = await API.put(
        "https://life-wise.site/members/changePassword",
        { password: newPassWord }
      );

      if (response.status === 200) {
        alert("비밀번호 변경 성공!");

        setIsPasswordModalOpen(false);
        setNewPassWord("");
      }
    } catch (error) {
      console.error("비밀번호 변경 실패", error);
      alert("비밀번호 변경 실패");
    }
  };

  return (
    <div className="account-container">
      <h1 className="account-title">내 계정 관리</h1>

      {/* 프로필 정보 */}
      <section className="profile-section">
        <h2>내 프로필</h2>
        <img src={Profile} alt="프로필 사진"></img>
        <h3>{memberName || "사용자 이름"}</h3>
        <p>{email || "사용자 이메일"}</p>
        <button
          onClick={() => setIsNameModalOpen(true)}
          className="profile-btn"
        >
          이름 변경
        </button>
      </section>

      {/* 이름 변경 모달 */}
      {isNameModalOpen && (
        <div className="namemodal-overlay">
          <div className="namemodal">
            <h2>이름 변경</h2>
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="새 이름을 입력하세요"
            />
            <div className="namemodal-buttons">
              <button onClick={handleMemberName}>확인</button>
              <button onClick={() => setIsNameModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 */}
      <section className="password-section">
        <h2>비밀번호</h2>
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="password-btn"
        >
          비밀번호 변경
        </button>
      </section>

      {/* 비밀번호 변경 모달 */}
      {isPasswordModalOpen && (
        <div className="namemodal-overlay">
          <div className="namemodal">
            <h2>비밀번호 변경</h2>
            <input
              type="password"
              value={newPassWord}
              onChange={(e) => setNewPassWord(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
            />
            <div className="namemodal-buttons">
              <button onClick={handlePassword}>확인</button>
              <button onClick={() => setIsPasswordModalOpen(false)}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
