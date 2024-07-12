const { timer } = require("./linkedin.common.service");
const fs = require("fs");
async function getUrls(page, cdp, data) {
  const { url, pageSize, method = 1 } = data;

  try {
    if (method === 1) {
      let urls = [];
      let currentPage = 1;
      await page.goto(url);
      await page.waitForSelector(".app-aware-link.scale-down");

      while (currentPage <= pageSize) {
        const pageUrls = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll(".app-aware-link.scale-down")
          ).map((button) => button.href.split("?")[0]);
        });
        urls = urls.concat(pageUrls);

        await page.waitForSelector('button[aria-label="Next"]');
        await page.cursor.click('button[aria-label="Next"]');

        currentPage++;
      }

      fs.writeFileSync("1.txt", urls.join("\n"));
    } else if (method === 2) {
      let urls = [];

      await page.waitForSelector(
        'button[aria-label*="reactions"].t-black--light.display-flex.align-items-center'
      );
      await page.cursor.click(
        'button[aria-label*="reactions"].t-black--light.display-flex.align-items-center'
      );
      await page.waitForSelector(".link-without-hover-state.ember-view");

      // fs.writeFileSync("1.txt", urls.join("\n"));
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = getUrls;
