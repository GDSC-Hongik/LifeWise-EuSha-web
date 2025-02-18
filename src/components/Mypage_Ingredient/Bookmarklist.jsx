import "./Likes.css";
import { useState, useEffect } from "react";
import API from "../../api/axiosInstance";

const Bookmarklist = () => {
  const [bookMarks, setBookMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async (e) => {
      e.preventDefault();

      try {
        const response = await API.get(
          "https://life-wise.site/members/bookmarks"
        );

        if (response.status === 200) {
          setBookMarks(response.data);
        }
      } catch (error) {
        console.error("북마크 목록을 가져오는 중 오류 발생:", error);
        setError("북마크 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="likes-container">
      <h1>내 북마크 목록</h1>

      {loading && <p>로딩 중...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="likes-list">
        {bookMarks.length > 0
          ? bookMarks.map((bookmark) => (
              <li key={bookmark.likeid} className="like-item">
                <img
                  src={bookmark.detail.imageUrl}
                  alt={bookmark.detail.title}
                  className="like-image"
                />
                <div className="like-info">
                  <h3>{bookmark.detail.title}</h3>
                  <p>{bookmark.detail.description}</p>
                </div>
              </li>
            ))
          : !loading && <p>북마크한 항목이 없습니다.</p>}
      </ul>
    </div>
  );
};

export default Bookmarklist;
