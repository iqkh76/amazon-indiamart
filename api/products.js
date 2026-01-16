export default async function handler(req, res) {
  try {
    const category = (req.query.category || "electronics").toLowerCase();

    const categoryProducts = {
      electronics: [
        "Bluetooth Earbuds",
        "Wireless Power Bank",
        "Smart Watch",
        "LED Desk Lamp",
        "Portable Speaker",
        "USB Extension Board"
      ],
      home: [
        "Air Fryer",
        "Electric Kettle",
        "Water Purifier",
        "Vacuum Cleaner",
        "Mixer Grinder",
        "Room Heater"
      ],
      kitchen: [
        "Induction Cooktop",
        "Non Stick Cookware Set",
        "Electric Rice Cooker",
        "Pressure Cooker",
        "Kitchen Storage Containers"
      ],
      office: [
        "Office Chair",
        "Study Table",
        "Laptop Stand",
        "Wireless Keyboard Mouse",
        "Desk Organizer"
      ],
      fitness: [
        "Yoga Mat",
        "Resistance Bands",
        "Dumbbells",
        "Skipping Rope",
        "Ab Roller"
      ]
    };

    const products = categoryProducts[category] || categoryProducts.electronics;

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
