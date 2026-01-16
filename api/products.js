import { getAmazonTopSellers } from "./amazon.js";
import { similarityScore } from "./similarity.js";

export default async function handler(req, res) {
  try {
    const amazonProducts = await getAmazonTopSellers();

    const results = await Promise.all(
      amazonProducts.map(async (p) => {
        const query = p.title.split(" ").slice(0, 4).join(" ");
        const indiamartLink =
          `https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(query)}`;

        const similarity = await similarityScore(p.title, query);

        return {
          ...p,
          indiamartLink,
          similarity
        };
      })
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
