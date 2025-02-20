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
  const [bookmarkState, setBookmarkState] = useState({
    isBookmarked: false,
    bookmarkId: null,
  });

  // 🔹 서버에서 북마크 상태 가져오기
  useEffect(() => {
    const fetchBookmarkState = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token || !id) return;

      try {
        const response = await fetch("https://life-wise.site/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("북마크 목록 조회 실패");

        const data = await response.json();
        const bookmarks = data.bookmarks || [];

        // 현재 항목이 북마크에 있는지 확인
        const existingBookmark = bookmarks.find(
          (bookmark) =>
            bookmark.detail && Number(bookmark.detail.id) === Number(id)
        );

        setBookmarkState({
          isBookmarked: !!existingBookmark,
          bookmarkId: existingBookmark ? existingBookmark.bookmarkId : null,
        });
      } catch (error) {
        console.error("북마크 상태 확인 중 오류:", error);
      }
    };

    fetchBookmarkState();
  }, [id]); // ✅ id 변경 시 실행

  // 🔹 북마크 추가/삭제 핸들러
  const toggleBookmark = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (bookmarkState.isBookmarked && bookmarkState.bookmarkId) {
        // 🔸 DELETE 요청 (북마크 삭제)
        const response = await fetch(
          `https://life-wise.site/bookmarks/${bookmarkState.bookmarkId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("북마크 삭제 실패");

        console.log(`북마크 삭제 성공! ID: ${bookmarkState.bookmarkId}`);
        setBookmarkState({ isBookmarked: false, bookmarkId: null });
      } else {
        // 🔸 POST 요청 (북마크 추가)
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
        console.log(`북마크 저장 성공! ID: ${data.bookmarkId}`, data);

        setBookmarkState({ isBookmarked: true, bookmarkId: data.bookmarkId });
      }
    } catch (error) {
      console.error(error);
      alert("북마크 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <StyledBookmark
      onClick={toggleBookmark}
      fill={bookmarkState.isBookmarked ? "black" : "none"}
      stroke="black"
    />
  );
};

export default BookmarkBox;
