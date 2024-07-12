const puppeteer = require("puppeteer");
const fs = require("fs");
const Linkout = require("./lib/linkedin.service");
require("dotenv").config();

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
    cookie: process.env.COOKIE,
  });

  // await Linkout.services.getUsersUrl(page, cdp, {
  //   url: "https://www.linkedin.com/search/results/people/?currentCompany=%5B%2211529916%22%5D&origin=FACETED_SEARCH&sid=sUK",
  //   pageSize: 20,
  // });

  // const urls = fs.readFileSync("1.txt", "utf-8").split("\n");
  // for (const url of urls) {
  //   if (url.trim()) {
  //     await Linkout.services.like(page, cdp, {
  //       url: url.trim(),
  //     });
  //   }
  // }
  browser.close();
})();
