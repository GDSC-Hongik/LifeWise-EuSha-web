import PropTypes from "prop-types";
import "./Profile.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Link import 추가
import API from "../api/axiosInstance";

const Profile = ({ onClose }) => {
  const navigate = useNavigate();
  const [membername, setMembername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setMembername(storedUsername);
    } else {
      setMembername(null);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        onClose();
        navigate("/");
        return;
      }

      await API.post("http://AWS/members/logout", {
        refreshToken,
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      console.log("logout 성공"); // 검증
      navigate("/"); // 로그아웃하면 홈으로 이동하냐??
    } catch (error) {
      console.error("logout 실패", error);
      alert("logout 실패"); // 검증
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="username">
          👤{" "}
          {membername ? (
            membername // { username }을 잘못 사용하지 않고 직접 출력
          ) : (
            <Link to="/Login">
              <button>로그인</button>
            </Link>
          )}
        </h2>
        <div className="modal-list">
          <p className="mypage">
            <Link to="./mypage">📄마이페이지</Link>
          </p>
          <p className="bookmark">
            <Link to="./bookmark">🔖북마크</Link>
          </p>
          <p className="setting">⚙️설정</p>
        </div>
        <div className="footer">
          <p className="logout" onClick={handleLogout}>
            로그아웃
          </p>
          <p className="question">고객센터</p>
        </div>
        <button onClick={onClose} className="close-button">
          닫기
        </button>
      </div>
    </div>
  );
};

// prop-types로 onClose의 타입을 함수로 선언
Profile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Profile;
