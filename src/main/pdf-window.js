import { BrowserWindow, ipcMain } from "electron";
import EventEmitter from "events";

class PDF_Window extends EventEmitter {
  constructor(text) {
    super();
    this.window = new BrowserWindow({ show: false });
    this.window.loadURL(`file://${__dirname}/../../pdf.html`);
    ipcMain.once("REQUEST_TEXT", e => {
      e.returnValue = text;
    });
    ipcMain.once("RENDERED_CONTENTS", () => {
      this.emit("RENDERED_CONTENTS");
    });
  }

  generatePDF() {
    return new Promise((resolve, reject) => {
      this.window.webContents.printToPDF({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  close() {
    this.window.close();
    this.window.on("closed", () => {
      this.window = null;
    });
  }
}

function createPDFWindow(contents, file_manager) {
  return new PDF_Window(contents, file_manager);
}

export default createPDFWindow;
