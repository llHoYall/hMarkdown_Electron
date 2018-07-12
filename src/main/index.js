import { app } from "electron";
import createMainWindow from "./create-main-window";

let main_window = null;

app.on("ready", () => {
  main_window = createMainWindow();
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
