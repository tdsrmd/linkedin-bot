const puppeteer = require("puppeteer");
const fs = require("fs");
const Linkout = require("./lib/linkedin.service");

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
      "AQEDAUKJ1v0BZN9jAAABkIgmvWIAAAGQrDNBYk0AQQnVSFOStRkPqVXJjPNoGtt5t9RRaYViSt6_iyd1rSXSFWqFuMn74JbTINL9tp_Y7xCHi1YAU8xMfBLuztbv5nvncVUuJayyLdrARggHfpvgSYpu",
  });

  const urls = fs.readFileSync("1.txt", "utf-8").split("\n");

  for (const url of urls) {
    if (url.trim()) {
      await Linkout.services.follow(page, cdp, {
        url: url.trim(),
      });
    }
  }
})();
