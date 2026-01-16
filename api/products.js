import { similarityScore } from "./similarity.js";

export default async function handler(req, res) {
  try {
    // Temporary popular product ideas (no Amazon API)
    const products = [
      "Bluetooth Earbuds",
      "Portable Air Cooler",
      "Electric Kettle",
      "LED Desk Lamp",
      "Wireless Power Bank",
      "Office Chair",
      "Water Purifier",
      "Air Fryer"
    ];

    const results = await Promise.all(
      products.map(async (title) => {
        const amazonLink =
          `https://www.amazon.in/s?k=${encodeURIComponent(title)}`;

        const indiamartLink =
          `https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(title)}`;

        const similarity = await similarityScore(title, title);

        return {
          title,
          price: "Check on Amazon",
          image: "https://via.placeholder.com/300?text=Amazon+Product",
          link: amazonLink,
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
