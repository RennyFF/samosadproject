import "./TGbutton.scss";
import React from "react";

export const TGButton = () => {
  return (
    <>
      <div id={"tgButtonBack"}>
        <a href={"https://t.me/truejke"} target='_blank'>
          <img id={"imageTg"} src={require("../sources/tg.png")} />
        </a>
      </div>
    </>
  );
};
