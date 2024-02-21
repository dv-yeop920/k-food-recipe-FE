import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostList } from "../services/post.services";
import Post from "../components/NoticeBoard/Post";
import styles from "../components/NoticeBoard/NoticeBoard.module.css";
import Pagenate from "../components/PagiNation/Pagenate";
import ScrollToTop from "../utils/scrollTop";
import useAuth from "../hooks/useAuth";
import button from "../styles/Button.module.css";

const PostPage = () => {
  const { authAndNavigate } = useAuth("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search");
  const pageParam = searchParams.get("page");

  const onClickPageNumber = pageNumber => {
    setSearchParams({
      page: pageNumber,
      search: searchParam,
    });
  };

  const { data } = useQuery({
    queryKey: ["postList", searchParam, pageParam],
    queryFn: () => getPostList(searchParam, pageParam),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  return (
    <main>
      <ScrollToTop tabParam={pageParam} />

      <section className={styles.boardContainer} aria-label="게시물 섹션">
        <div className={styles.write_button_box}>
          <button
            className={button.submit}
            onClick={() => {
              authAndNavigate("/writing");
            }}
          >
            글쓰기
          </button>
        </div>
        <li className={styles.li}>
          <div>
            <h3 style={{ color: "rgb(200, 50, 100)" }}>[공지]</h3>
            <h3 className={styles.title}>게시판 이용 수칙</h3>
          </div>
        </li>

        {data?.postList?.map(post => {
          return <Post key={post._id} post={post} />;
        })}

        {data?.postList?.length === 0 && (
          <p
            style={{
              padding: "70px",
              textAlign: "center",
              fontSize: "35px",
              fontWeight: "600",
            }}
          >
            검색 결과가 없습니다!
          </p>
        )}

        {data?.postList?.length > 0 && (
          <Pagenate
            onClickPageNumber={onClickPageNumber}
            totalPostLength={data.totalPostLength}
            pageParam={pageParam}
          />
        )}
      </section>
    </main>
  );
};

export default PostPage;
