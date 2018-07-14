import { ipcRenderer } from "electron";
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

  componentDidMount() {
    ipcRenderer.on("REQUEST_TEXT", () => {
      ipcRenderer.send("REPLY_TEXT", this.state.text);
    });
    ipcRenderer.on("SEND_TEXT", (_e, text) => {
      this.setState({ text });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
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
