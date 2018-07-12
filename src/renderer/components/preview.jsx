import React from "react";
import Marked from "marked";
import style from "./preview.css";

Marked.setOptions({ sanitize: true });

export default function Preview(props) {
  return (
    <div id="preview" className={`${props.className} ${style.preview}`}>
      <span dangerouslySetInnerHTML={{ __html: Marked(props.value) }} />
    </div>
  );
}
