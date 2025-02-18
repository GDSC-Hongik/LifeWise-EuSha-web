import "./Likes.css";
import { useState, useEffect } from "react";

const Bookmarklist = () => {
  const [bookMarks, setBookMarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookMarks(JSON.parse(storedBookmarks));
    }
  }, []);

  return (
    <div className="likes-container">
      <h1>내 북마크 목록</h1>

      <ul className="likes-list">
        {bookMarks.length > 0
          ? bookMarks.map((bookmark) => (
              <li key={bookmark.bookmarkId} className="like-item">
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
          : !(<p>북마크한 항목이 없습니다.</p>)}
      </ul>
    </div>
  );
};

export default Bookmarklist;
