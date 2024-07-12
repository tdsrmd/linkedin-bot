const { createLinkedinUrl, timer } = require("./linkedin.common.service");

async function like(page, cdp, data) {
  const { url } = data;

  try {
    const activityUrl = await createLinkedinUrl(url, 4);

    await page.goto(activityUrl);

    await page.waitForSelector(".profile-creator-shared-image__container");
    await timer(1000);
    await page.cursor.click(".profile-creator-shared-image__container");
    await timer(5000);

    await page.waitForSelector('button[aria-label="React Like"]');
    await timer(5000);
    await page.cursor.click('button[aria-label="React Like"]');
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = like;
