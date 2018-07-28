import React from "react";
import marked from "marked";
import emojione from "emojione";
import style from "./Previewer.css";

const renderer = new marked.Renderer();
renderer.text = text => {
  return emojione.shortnameToImage(text);
};

export default function Previewer(props) {
  return (
    <div id="previewer" className={`${props.className} ${style.previewer}`}>
      <span
        dangerouslySetInnerHTML={{ __html: marked(props.value, { renderer }) }}
      />
    </div>
  );
}
