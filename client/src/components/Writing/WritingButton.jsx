import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Writing.module.css";
import button from "../../styles/Button.module.css";

const WritingButton = ({ buttonValue }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className={`
              ${styles.writing_button}
              ${button.cancle}`}
        style={{ marginRight: "0.5rem" }}
        type="button"
        onClick={() => {
          if (window.confirm("게시글 작성을 취소 하시겠어요?")) {
            navigate(-1, { replace: true });
          }
        }}
      >
        취소
      </button>

      <button
        className={`
              ${styles.writing_button}
              ${button.submit}`}
        type="submit"
      >
        {buttonValue === "등록" ? "등록" : "수정"}
      </button>
    </>
  );
};

export default WritingButton;
