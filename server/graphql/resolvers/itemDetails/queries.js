const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const scrapeHomeDepotLink = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const name = await page.evaluate(
    () => document.querySelector("meta[property='og:image:alt']").content
  );

  const image = await page.evaluate(
    () => document.querySelector("meta[property='og:image']").content
  );

  await page.waitForSelector(".hdca-product__description-pricing-price-value");
  const unitPrice = await page.evaluate(() =>
    document
      .querySelector(".hdca-product__description-pricing-price-value")
      ?.textContent.replace(/[^0-9.-]+/g, "")
  );

  // const unitPriceCurrency = await page.evaluate(
  //   () => document.querySelector("span[itemprop='priceCurrency']")?.textContent
  // );

  const vendorName = await page.evaluate(
    () => document.querySelector("meta[property='og:site_name']").content
  );

  await browser.close();

  const domainEnding = url.split(".").splice(-1)[0].split("/")[0];
  const unitPriceCurrency = domainEnding === "ca" ? "CAD" : "USD";

  return {
    name,
    image,
    url,
    unitPrice,
    unitPriceCurrency,
    vendor: {
      name: vendorName,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/1200px-TheHomeDepot.svg.png",
      domain: "",
    },
  };
};
// Canadian Tire
// Home Depot
// REV
// Amazon

const itemDetailsQueries = {
  itemDetails: async (_, { url }) => {
    // const { hostname } = new URL(url);

    // const plainHostname = hostname.split(".")[1];
    // console.log(plainHostname);
    return await scrapeHomeDepotLink(url);

    // get root domain
    // get vendor from API
    // get rest of details from handler

    return {};
  },
};

// itemDetailsQueries.itemDetails(null, {
//   url: "https://www.homedepot.ca/product/micropro-sienna-2-x-4-x-8-pressure-treated-wood-above-ground-use-only-/1000789777",
// });
export default itemDetailsQueries;
