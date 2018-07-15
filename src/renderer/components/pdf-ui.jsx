import { ipcRenderer } from "electron";
import React, { Component } from "react";
import Preview from "./preview.jsx";

export default class PDF_UI extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  componentDidMount() {
    const text = ipcRenderer.sendSync("REQUEST_TEXT");
    this.setState({ text });
  }

  componentDidUpdate() {
    this.syncImageRenderered().then(() => {
      ipcRenderer.send("RENDERED_CONTENTS");
    });
  }

  syncImageRenderered() {
    const images = Array.prototype.slice.call(document.querySelectorAll("img"));
    const loading_images = images.filter(img => !img.complete);
    if (loading_images.length === 0) {
      return Promise.resolve();
    }

    return Promise.all(
      loading_images.map(
        img => new Promise(resolve => (img.onload = () => resolve()))
      )
    );
  }

  render() {
    return <Preview value={this.state.text} />;
  }
}
