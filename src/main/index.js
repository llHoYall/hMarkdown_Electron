import { app } from "electron";
import createMainWindow from "./create-main-window";
import setAppMenu from "./menu";

function openFile() {
  console.log("openFile");
}

function saveFile() {
  console.log("saveFile");
}

function saveAsNewFile() {
  console.log("saveAsNewFile");
}

function exportPDF() {
  console.log("exportPDF");
}

app.on("ready", () => {
  createMainWindow();
  setAppMenu({ openFile, saveFile, saveAsNewFile, exportPDF });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("active", (_e, has_visible_windows) => {
  if (!has_visible_windows) {
    createMainWindow();
  }
});
