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

      // 로그아웃 요청 전에 refreshToken 유효성 검사
      const response = await API.delete(
        "https://life-wise.site/members/logout",
        {
          data: { refreshToken },
        }
      );

      console.log(response.data); // 응답 데이터 확인

      localStorage.clear();
      setmemberName("");
      console.log("로그아웃 성공");
      alert("로그아웃 되었습니다.");

      onClose();
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("logout 실패", error);
      if (error.response) {
        console.error("응답 오류", error.response);
        if (error.response.status === 401) {
          // 만약 401 오류라면 refreshToken이 만료된 상태일 수 있음
          alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          navigate("/Login"); // 로그인 페이지로 리디렉션
        }
      }
      alert("로그아웃 실패");
    }
  };

  const handleMypageClick = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }

    try {
      const response = await API.get("https://life-wise.site/members/mypage");

      console.log("마이페이지 응답: ", response.data);
      navigate("/mypage");
    } catch (error) {
      console.error("마이페이지 요청 실패", error);

      if (error.response && error.response.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/Login");
      } else {
        alert("마이페이지 이동 실패");
      }
    }
  };

  const handleBookmarkClick = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }

    try {
      const response = await API.get("https://life-wise.site/members/bookmark");

      console.log("북마크 응답: ", response.data);
      navigate("/bookmark");
    } catch (error) {
      console.error("북마크 요청 실패", error);

      if (error.response && error.response.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/Login");
      } else {
        alert("마이페이지 이동 실패");
      }
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
          <p className="mypage" onClick={handleMypageClick}>
            📄마이페이지
          </p>
          <p className="bookmark" onClick={handleBookmarkClick}>
            🔖북마크
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
