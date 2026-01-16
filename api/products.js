export default async function handler(req, res) {
  try {
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

    const results = products.map(title => ({
      title,
      price: "Check on Amazon",
      image: "/placeholder.png",
      link: `https://www.amazon.in/s?k=${encodeURIComponent(title)}`,
      indiamartLink: `https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(title)}`,
      similarity: "N/A"
    }));

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
