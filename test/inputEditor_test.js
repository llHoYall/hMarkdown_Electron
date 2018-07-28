const assert = require("assert");
const jsdom = require("jsdom");
const createApplication = require("./createApplication");
const EditorPage = require("./editor.page");
const { capturePage, reportLog } = require("./helper");

const { JSDOM } = jsdom;

describe("Editor Input Test", function() {
  this.timeout(10000);
  let app;

  beforeEach(function() {
    app = createApplication();
    return app.start();
  });

  afterEach(function() {
    if (this.currentTest.state === "failed") {
      return Promise.all([
        capturePage(app, this.currentTest.title),
        reportLog(app, this.currentTest.title)
      ]).then(() => app.stop());
    }
    return app.stop();
  });

  describe("Markdown Text Input", function() {
    it("HTML is rendered", function() {
      const page = new EditorPage(app.client);
      return page
        .inputText("# h1 Title\n## h2 Title")
        .then(() => page.getRenderedHTML())
        .then(html => {
          const dom = new JSDOM(html);
          const h1 = dom.window.document.querySelector("h1");
          assert.equal(h1.textContent, "h1 Title");
          const h2 = dom.window.document.querySelector("h2");
          assert.equal(h2.textContent, "h2 Title");
        });
    });
  });

  describe("Emoticon Input", function() {
    it("PNG image is rendered", function() {
      const page = new EditorPage(app.client);
      return page
        .inputText(":tada:")
        .then(() => page.findEmojiElement("tada"))
        .then(element => assert(!!element));
    });
  });
});
