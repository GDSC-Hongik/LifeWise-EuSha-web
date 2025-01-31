import PropTypes from "prop-types";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>👤 김강민</h2>
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
