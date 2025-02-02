import PropTypes from "prop-types";
import "./Profile.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link import 추가

const Profile = ({ onClose }) => {
  const [membername, setMembername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setMembername(storedUsername);
    } else {
      setMembername(null);
    }
  }, []);

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
          <p className="logout">로그아웃</p>
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
