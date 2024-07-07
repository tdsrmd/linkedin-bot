async function scrapeProfileData(page) {
  try {
    await page.waitForSelector(
      ".text-heading-xlarge.inline.t-24.v-align-middle.break-words"
    );

    const fullName = await page.evaluate(() => {
      const titleElement = document.querySelector(
        ".text-heading-xlarge.inline.t-24.v-align-middle.break-words"
      );
      return titleElement.textContent.trim();
    });

    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    if (
      typeof fullName === "string" &&
      fullName !== "" &&
      typeof firstName === "string" &&
      firstName !== "" &&
      typeof lastName === "string" &&
      lastName !== ""
    ) {
      return {
        fullName,
        firstName,
        lastName,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

module.exports = scrapeProfileData;
