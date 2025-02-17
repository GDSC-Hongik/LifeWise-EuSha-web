import "./Likes.css";
import { useState, useEffect } from "react";
import API from "../../api/axiosInstance";

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await API.get("https://life-wise.site/members/likes", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setLikes(response.data);
        }
      } catch (error) {
        console.error("좋아요 목록을 가져오는 중 오류 발생:", error);
        setError("좋아요 목록을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div className="likes-container">
      <h1>내 좋아요 목록</h1>

      {loading && <p>로딩 중...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="likes-list">
        {likes.length > 0
          ? likes.map((like) => (
              <li key={like.id} className="like-item">
                <img
                  src={like.imageUrl}
                  alt={like.title}
                  className="like-image"
                />
                <div className="like-info">
                  <h3>{like.title}</h3>
                  <p>{like.description}</p>
                </div>
              </li>
            ))
          : !loading && <p>좋아요한 항목이 없습니다.</p>}
      </ul>
    </div>
  );
};

export default Likes;
