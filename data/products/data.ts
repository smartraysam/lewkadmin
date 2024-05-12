const products = [
  {
    id: "1",
    product: "Horizon UI PRO",
    description: "Stylish and comfortable sneakers for everyday wear.",
    quantity: 2458,
    category: "Shoe",
  },
  {
    id: "2",
    product: "Horizon UI Free",
    description: "Classic leather handbag with multiple compartments.",
    quantity: 1485,
    category: "Bag",
  },
  {
    id: "3",
    product: "Weekly Upcategory",
    description: "Elegant evening gown with intricate lace detailing.",
    quantity: 1024,
    category: "Dress",
  },
  {
    id: "4",
    product: "Venus 3D Asset",
    description: "Exquisite diamond necklace with a timeless design.",
    quantity: 858,
    category: "Jewelry",
  },
  {
    id: "5",
    product: "Marketplace",
    description: "Trendy canvas sneakers in various colors.",
    quantity: 258,
    category: "Shoe",
  },
  {
    id: "6",
    product: "Horizon UI Free",
    description: "Stylish leather tote bag with adjustable straps.",
    quantity: 1485,
    category: "Bag",
  },
  {
    id: "7",
    product: "Weekly Upcategory",
    description: "Chic cocktail dress perfect for special occasions.",
    quantity: 1024,
    category: "Dress",
  },
  {
    id: "8",
    product: "Venus 3D Asset",
    description: "Elegant pearl bracelet with a sterling silver clasp.",
    quantity: 858,
    category: "Jewelry",
  },
  {
    id: "9",
    product: "Horizon UI Free",
    description: "Modern backpack with padded laptop compartment.",
    quantity: 1485,
    category: "Bag",
  },
  {
    id: "10",
    product: "Weekly Upcategory",
    description: "Flowy maxi dress with a bohemian floral print.",
    quantity: 1024,
    category: "Dress",
  },
  // Add more data here...
];

// Generating more data
for (let i = 11; i <= 100; i++) {
  products.push({
    id: i.toString(),
    product: `Product ${i}`,
    description: `Description for Product ${i}`,
    quantity: Math.floor(Math.random() * 5000) + 1,
    category: ["Shoe", "Bag", "Dress", "Jewelry"][
      Math.floor(Math.random() * 4)
    ],
  });
}

export default products;
