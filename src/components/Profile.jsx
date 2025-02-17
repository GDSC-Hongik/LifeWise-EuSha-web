import PropTypes from "prop-types";
import "./Profile.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Link import
import API from "../api/axiosInstance";

const Profile = ({ onClose }) => {
  const navigate = useNavigate();
  const [memberName, setmemberName] = useState("");

  useEffect(() => {
    const storedmemberName = localStorage.getItem("memberName");
    if (storedmemberName) {
      setmemberName(storedmemberName);
    } else {
      setmemberName(null);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        onClose();
        navigate("/");
        localStorage.clear();
        return;
      }

      await API.delete("https://life-wise.site/members/logout", {
        data: { refreshToken },
      });

      localStorage.clear();
      setmemberName("");

      console.log("로그아웃 성공");

      onClose();
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (error) {
      console.error("logout 실패", error);
      if (error.response) {
        console.error("응답 오류", error.response);
      }
      alert("logout 실패"); // 검증
    }
  };
  return (
    <div className="profilemodal">
      <div className="profilemodal-content">
        <h2 className="username">
          👤{" "}
          {memberName ? (
            memberName // { username }을 잘못 사용하지 않고 직접 출력
          ) : (
            <Link to="/Login">
              <button>로그인</button>
            </Link>
          )}
        </h2>
        <div className="profilemodal-list">
          <p className="mypage">
            <Link to="/mypage">📄마이페이지</Link>
          </p>
          <p className="bookmark">
            <Link to="/bookmark">🔖북마크</Link>
          </p>
        </div>
        <div className="profilefooter">
          {memberName && (
            <p className="logout" onClick={handleLogout}>
              로그아웃
            </p>
          )}
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
