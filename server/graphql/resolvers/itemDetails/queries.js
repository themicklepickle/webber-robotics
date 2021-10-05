import ogs from "open-graph-scraper";
import fetch from "node-fetch";
import { Vendor } from "../../../db/models";

const getClearbitInfo = async (domain) => {
  const response = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${domain}`
  );
  const suggestions = await response.json();

  if (suggestions.message || suggestions.length === 0) return;
  return suggestions[0];
};

const findVendor = async (domain) => {
  const vendor = await Vendor.findOne({ domain });

  return vendor;
};

const itemDetailsQueries = {
  itemDetails: async (_, { url }) => {
    const domain = new URL(url).hostname.split(".").splice(-2, 1)[0]; // domain without extension, e.g. google

    const ogsOptions = {
      url,
      customMetaTags: [
        { multiple: false, property: "og:image:alt", fieldName: "title" },
      ],
    };

    let result = {};
    try {
      ({ result } = await ogs(ogsOptions));
    } catch (error) {
      console.error(error);
    }
    const clearbitInfo = await getClearbitInfo(domain);
    const existingVendor = await findVendor(domain);

    return {
      name: result?.title ?? result?.ogTitle,
      vendor: existingVendor ?? {
        name: result?.ogSiteName ?? clearbitInfo?.name,
        logo: clearbitInfo?.logo,
      },
      image: result?.ogImage?.url,
      url: result?.ogUrl ?? url,
    };
  },
};

export default itemDetailsQueries;
