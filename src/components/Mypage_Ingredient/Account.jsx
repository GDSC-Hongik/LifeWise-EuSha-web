import "./Account.css";
import Profile from "../../assets/Image.png";
import { useState, useEffect } from "react";
import API from "../../api/axiosInstance";

const Account = () => {
  const [memberName, setmemberName] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setNewMemberName("");
  };

  useEffect(() => {
    const storedmemberName = localStorage.getItem("memberName");
    const storedemail = localStorage.getItem("email");

    if (storedmemberName) {
      setmemberName(storedmemberName);
    }
    if (storedemail) {
      setEmail(storedemail);
    }
  }, []);

  const handlememberName = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await API.put(
        "http://localhost:8080/members/newName",
        { memberName: newMemberName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedName = response.data.memberName;
        alert("이름 변경 성공!");

        setmemberName(updatedName);
        localStorage.setItem("memberName", updatedName);

        closeModal();
      }
    } catch (error) {
      console.error("이름 변경 실패", error);
      alert("이름 변경 실패");
    }
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
        <h3>{memberName || "사용자 이름"}</h3>
        <p>{email || "사용자 이메일"}</p>
        <button onClick={openModal} className="profile-btn">
          이름 변경
        </button>
      </section>

      {/* 이름 변경 모달 */}
      {isModalOpen && (
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
              <button onClick={handlememberName}>확인</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )}

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
