import "./Likes.css";
import { useState, useEffect } from "react";
import "./Bookmarklist.css";

const Bookmarklist = () => {
  const [bookMarks, setBookMarks] = useState([]);

  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem("bookmarks");
      if (storedBookmarks) {
        setBookMarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error("로컬스토리지에서 북마크 가져오기 실패", error);
    }
  }, []);

  return (
    <div className="likes-container">
      <h1>내 북마크 목록</h1>
      <p className="likes-devide"></p>
      <ul className="likes-list">
        {bookMarks.length > 0 ? (
          bookMarks.map((bookmark) => (
            <li key={bookmark.bookmarkId} className="like-item">
              <img
                src={`${"https://life-wise.site"}${bookmark.detail.imageUrl}`}
                alt={bookmark.detail.title}
                className="like-image"
              />
              <div className="like-info">
                <h3>{bookmark.detail.title}</h3>
                <p>{bookmark.detail.description}</p>
              </div>
            </li>
          ))
        ) : (
          <p>북마크한 항목이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default Bookmarklist;
