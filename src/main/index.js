import { app } from "electron";
import createMainWindow from "./create-main-window";
import setAppMenu from "./menu";
import showSaveAsNewFileDialog from "./show-save-as-new-file-dialog";
import showOpenFileDialog from "./show-open-file-dialog";
import FileManager from "./file-manager";
import createPDFWindow from "./pdf-window";
import showExportPDFDialog from "./show-export-pdf-dialog";

let main_window = null;
let file_manager = null;

function openFile() {
  showOpenFileDialog()
    .then(filePath => file_manager.readFile(filePath))
    .then(text => main_window.sendText(text))
    .catch(err => {
      console.log(err);
    });
}

function saveFile() {
  if (!file_manager.filePath) {
    saveAsNewFile();
    return;
  }

  main_window
    .requestText()
    .then(text => file_manager.writeFile(text))
    .catch(err => {
      console.log(err);
    });
}

function saveAsNewFile() {
  Promise.all([showSaveAsNewFileDialog(), main_window.requestText()])
    .then(([filePath, text]) => file_manager.saveFile(filePath, text))
    .catch(err => {
      console.log(err);
    });
}

function exportPDF() {
  Promise.all([showExportPDFDialog(), main_window.requestText()])
    .then(([filePath, text]) => {
      const pdf_window = createPDFWindow(text);
      pdf_window.on("RENDERED_CONTENTS", () => {
        console.log("exportPDF");
        pdf_window
          .generatePDF()
          .then(pdf => file_manager.writePdf(filePath, pdf))
          .then(() => pdf_window.close())
          .catch(err => {
            console.log(err);
            pdf_window.close();
          });
      });
    })
    .catch(err => {
      console.log(err);
    });
}

app.on("ready", () => {
  main_window = createMainWindow();
  file_manager = FileManager();
  setAppMenu({ openFile, saveFile, saveAsNewFile, exportPDF });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("active", (_e, has_visible_windows) => {
  if (!has_visible_windows) {
    main_window = createMainWindow();
  }
});
