import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import c from "components/helpers/Loading.module.scss";

function Loading() {
  return (
    <div className={c.module}>
      <CircularProgress className={c.loading} />
    </div>
  );
}

export default Loading;