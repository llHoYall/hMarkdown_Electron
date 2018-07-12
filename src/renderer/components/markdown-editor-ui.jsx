import React, { Component } from "react";
import Editor from "./editor";
import Preview from "./preview";
import style from "./markdown-editor-ui.css";

export default class MarkdownEditorUI extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.onChangeText = this.onChangeText.bind(this);
  }

  render() {
    return (
      <div className={style.markdown_editor}>
        <Editor
          className={style.editor_area}
          value={this.state.text}
          onChange={this.onChangeText}
        />
        <Preview className={style.preview} value={this.state.text} />
      </div>
    );
  }

  onChangeText(e) {
    this.setState({ text: e.target.value });
  }
}
