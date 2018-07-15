import FS from "fs";

class FileManager {
  constructor() {
    this.filePath = "";
  }

  writeFile(text) {
    return this.saveFile(this.filePath, text);
  }

  saveFile(filePath, text) {
    return new Promise(resolve => {
      FS.writeFileSync(filePath, text);
      this.filePath = filePath;
      resolve();
    });
  }

  readFile(filePath) {
    return new Promise(resolve => {
      const text = FS.readFileSync(filePath, "utf8");
      this.filePath = filePath;
      resolve(text);
    });
  }

  writePdf(filePath, pdf) {
    return new Promise(resolve => {
      FS.writeFileSync(filePath, pdf);
      resolve();
    });
  }
}

function createFileManager() {
  return new FileManager();
}

export default createFileManager;
