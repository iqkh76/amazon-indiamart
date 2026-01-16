import { ApiClient, DefaultApi } from "amazon-paapi";

const client = new ApiClient({
  accessKey: process.env.AMAZON_ACCESS_KEY,
  secretKey: process.env.AMAZON_SECRET_KEY,
  region: process.env.AMAZON_REGION,
  host: "webservices.amazon.in"
});

const api = new DefaultApi(client);

export async function getAmazonTopSellers() {
  const res = await api.searchItems({
    Keywords: "best seller",
    SearchIndex: "Electronics",
    ItemCount: 5,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: "Associates",
    Marketplace: "www.amazon.in",
    Resources: [
      "Images.Primary.Large",
      "ItemInfo.Title",
      "Offers.Listings.Price"
    ]
  });

  return res.SearchResult.Items.map(item => ({
    title: item.ItemInfo.Title.DisplayValue,
    image: item.Images.Primary.Large.URL,
    price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || "N/A",
    link: item.DetailPageURL
  }));
}
