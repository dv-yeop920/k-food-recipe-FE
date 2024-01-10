import { Skeleton } from "@mui/material";
import React from "react";

const MainSkeleton = () => {
  return (
    <>
      <Skeleton
        style={{
          marginBottom: "10px",
          borderRadius: "20px",
        }}
        animation="wave"
        variant="image"
        height={300}
      />
      <Skeleton
        style={{
          borderRadius: "20px",
        }}
        animation="wave"
        variant="h4"
        height={40}
      />
    </>
  );
};

export default MainSkeleton;
