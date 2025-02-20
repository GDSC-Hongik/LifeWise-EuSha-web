import "./Likes.css";
import { useState, useEffect } from "react";

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem("likes");
      if (storedLikes) {
        setLikes(JSON.parse(storedLikes));
      }
    } catch (error) {
      console.error("로컬스토리지에서 좋아요 가져오기 실패", error);
    }
  }, []);

  return (
    <div className="likes-container">
      <h1>내 좋아요 목록</h1>

      <ul className="likes-list">
        {likes.length > 0 ? (
          likes.map((like) => (
            <li key={like.likeid} className="like-item">
              <img
                src={like.detail.imageUrl}
                alt={like.detail.title}
                className="like-image"
              />
              <div className="like-info">
                <h3>{like.detail.title}</h3>
                <p>{like.detail.description}</p>
              </div>
            </li>
          ))
        ) : (
          <p>좋아요한 항목이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default Likes;
