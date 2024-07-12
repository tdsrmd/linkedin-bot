const puppeteer = require("puppeteer");
const fs = require("fs");
const Linkout = require("./lib/linkedin.service");
const { url } = require("inspector");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const cdp = await page.target().createCDPSession();

  await page.setViewport({
    width: 1280,
    height: 900,
  });

  await Linkout.tools.loadCursor(page, true);

  await Linkout.services.login(page, cdp, {
    cookie:
      "AQEDAUKJ1v0FqB3nAAABkKKdnnYAAAGQxqoidk0AwNaxW1v2ncvw0AzuLGoNOjRGbTgDUYNOXsGozlT1fR7VBOLQu7lQDnYuChgX-gf7czAf-AY-L9piXNIWf7xcpFv-BFKY0NnEz6LPvihEM2lKb-Lj",
  });

  // await Linkout.services.getUsersUrl(page, cdp, {
  //   url: "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2211529916%22%5D&origin=FACETED_SEARCH&sid=sUK",
  //   pageSize: 20,
  // });

  const urls = fs.readFileSync("1.txt", "utf-8").split("\n");
  for (const url of urls) {
    if (url.trim()) {
      await Linkout.services.like(page, cdp, {
        url: url.trim(),
      });
    }
  }
  browser.close();
})();
