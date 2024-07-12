const { scrapeProfileData, timer } = require("./linkedin.common.service");

async function follow(page, cdp, data) {
  const { url } = data;

  try {
    await page.goto(url);

    const profileData = await scrapeProfileData(page);

    if (
      profileData &&
      typeof profileData.fullName === "string" &&
      profileData.fullName.trim() !== "" &&
      typeof profileData.firstName === "string" &&
      profileData.firstName.trim() !== "" &&
      typeof profileData.lastName === "string" &&
      profileData.lastName.trim() !== ""
    ) {
      try {
        await page.waitForSelector(
          `section.artdeco-card button[aria-label*="${profileData.fullName.trim()} adlı kullanıcıyı takip et"]`
        );

        await page.cursor.click(
          `section.artdeco-card button[aria-label*="${profileData.fullName.trim()} adlı kullanıcıyı takip et"]`
        );
      } catch (err) {
        try {
          await page.waitForSelector(
            'section.artdeco-card button[aria-label*="Daha fazla işlem"]'
          );

          await timer(1000);

          await page.cursor.click(
            'section.artdeco-card button[aria-label*="Daha fazla işlem"]'
          );

          await page.waitForSelector(
            `section.artdeco-card div[aria-label*="${profileData.fullName.trim()} adlı kullanıcıyı takip et"]`
          );

          await timer(1000);

          await page.cursor.click(
            `section.artdeco-card div[aria-label*="${profileData.fullName.trim()} adlı kullanıcıyı takip et"]`
          );
        } catch (err) {}
      }
    } else {
      console.error("An error occurred:", error);
    }

    // await page.waitForSelector('button[aria-label*="Send now"]:not(:disabled)');
    // await timer(1000);
    // await page.cursor.click('button[aria-label*="Send now"]:not(:disabled)');
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = follow;
