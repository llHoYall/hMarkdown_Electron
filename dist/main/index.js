/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/create-main-window.js":
/*!****************************************!*\
  !*** ./src/main/create-main-window.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainWindow = function MainWindow() {
  var _this = this;

  _classCallCheck(this, MainWindow);

  this.window = new _electron.BrowserWindow({ width: 800, height: 600 });
  this.window.loadURL("file://" + __dirname + "/../../index.html");
  this.window.on("closed", function () {
    _this.window = null;
  });
};

function createMainWindow() {
  return new MainWindow();
}

exports.default = createMainWindow;

/***/ }),

/***/ "./src/main/index.js":
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(/*! electron */ "electron");

var _createMainWindow = __webpack_require__(/*! ./create-main-window */ "./src/main/create-main-window.js");

var _createMainWindow2 = _interopRequireDefault(_createMainWindow);

var _menu = __webpack_require__(/*! ./menu */ "./src/main/menu.js");

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_electron.app.on("ready", function () {
  (0, _createMainWindow2.default)();
  (0, _menu2.default)({ openFile: openFile, saveFile: saveFile, saveAsNewFile: saveAsNewFile, exportPDF: exportPDF });
});

_electron.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    _electron.app.quit();
  }
});

_electron.app.on("active", function (_e, has_visible_windows) {
  if (!has_visible_windows) {
    (0, _createMainWindow2.default)();
  }
});

/***/ }),

/***/ "./src/main/menu.js":
/*!**************************!*\
  !*** ./src/main/menu.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

function setAppMenu(options) {
  var template = [{
    label: "File",
    submenu: [{
      label: "Open",
      accelerator: "CmdOrCtrl+O",
      click: function click() {
        return options.openFile();
      }
    }, {
      label: "Save",
      accelerator: "CmdOrCtrl+S",
      click: function click() {
        return options.saveFile();
      }
    }, { label: "Save As...", click: function click() {
        return options.saveAsNewFile();
      } }, { label: "Export PDF", click: function click() {
        return options.exportPDF();
      } }]
  }, {
    label: "Edit",
    submenu: [{ label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" }, { label: "Paste", accelerator: "CmdOrCtrl+P", role: "paste" }, { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" }, { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" }]
  }, {
    label: "View",
    submenu: [{
      label: "Toggle DevTools",
      accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
      click: _electron.BrowserWindow.getFocusedWindow().toggleDevTools()
    }]
  }];

  if (process.platform === "darwin") {
    template.unshift({
      label: "MarkdownEditor",
      submenu: [{
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click: function click() {
          return _electron.app.quit();
        }
      }]
    });
  }

  _electron.Menu.setApplicationMenu(_electron.Menu.buildFromTemplate(template));
}

exports.default = setAppMenu;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map