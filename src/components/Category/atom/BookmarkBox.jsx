import styled from "styled-components";
import { Bookmark } from "lucide-react";
import { useState, useEffect } from "react";

const StyledBookmark = styled(Bookmark)`
  position: absolute;
  top: 12%;
  left: 88%;
  transform: translate(-50%, -50%);
  width: 18%;
  height: 18%;
  cursor: pointer;
  z-index: 3;
`;

const BookmarkBox = ({ id }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    let savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

    if (savedBookmarks[id]) {
      setIsFilled(true);
      setBookmarkId(savedBookmarks[id]);
    }
  }, [id]);

  const toggleBookmark = async () => {
    if (!id) {
      console.error("detailId가 없습니다!");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    let savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

    if (isFilled) {
      // 🔹 DELETE 요청 (북마크 삭제)
      try {
        const response = await fetch(
          `https://life-wise.site/bookmarks/${bookmarkId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("북마크 삭제 실패");

        console.log(`북마크 삭제 성공! ID: ${bookmarkId}`);
        setIsFilled(false);
        setBookmarkId(null);

        // localStorage에서도 삭제
        delete savedBookmarks[id];
        localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
      } catch (error) {
        console.error(error);
        alert("북마크 삭제 중 오류가 발생했습니다.");
      }
    } else {
      // 🔹 이미 북마크된 ID가 있는지 확인
      if (savedBookmarks[id]) {
        console.log("이미 북마크됨, 다시 추가할 필요 없음.");
        setIsFilled(true);
        setBookmarkId(savedBookmarks[id]);
        return;
      }

      // 🔹 POST 요청 (북마크 추가)
      try {
        const response = await fetch("https://life-wise.site/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ detailId: id }),
        });

        if (!response.ok) throw new Error("북마크 등록 실패");

        const data = await response.json();
        console.log("현재 데이터 : ", data);
        console.log(`북마크 저장 성공! ID: ${data.bookmarkId}`, data);
        setIsFilled(true);
        setBookmarkId(data.bookmarkId);

        // localStorage에 저장 (이전 bookmarkId가 있으면 유지)
        savedBookmarks[id] = data.bookmarkId;
        localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
      } catch (error) {
        console.error(error);
        alert("북마크 등록 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <StyledBookmark
      onClick={toggleBookmark}
      fill={isFilled ? "black" : "none"}
      stroke="black"
    />
  );
};

export default BookmarkBox;
