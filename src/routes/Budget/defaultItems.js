const defaultItems = [
  {
    name: "Screws",
    priority: "High",
    description: "Need these for securing things together",
    vendor: {
      name: "Home Depot",
      logo: "../images/vendors/home-depot-ca.jpeg",
    },
    quantity: 10,
    unitPrice: 57.9,
    unitPriceCurrency: "USD",
    isPurchased: false,
    datePurchased: new Date(),
    url: "https://www.homedepot.ca/product/micropro-sienna-2-x-4-x-8-pressure-treated-wood-above-ground-use-only-/1000789777",
  },
  {
    name: "Tape",
    priority: "Medium",
    description: "Need these for securing things together",
    vendor: {
      name: "Canadian Tire",
      logo: "../images/vendors/canadian-tire.webp",
    },
    quantity: 10,
    unitPrice: 5,
    unitPriceCurrency: "EUR",
    isPurchased: false,
    datePurchased: new Date(),
    url: "https://www.canadiantire.ca/en/pdp/mastercraft-high-visibility-pliers-set-6-pc-0584789p.html#srp",
  },
  {
    name: "Wheels",
    priority: "Low",
    description: "For the robot to move around",
    vendor: {
      name: "Rev Robotics",
      logo: "https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/original/rev_logo-250x100px_1597946647__83857.original.png",
    },
    quantity: 10,
    unitPrice: 5,
    unitPriceCurrency: "CAD",
    isPurchased: false,
    datePurchased: new Date(),
    url: "https://www.revrobotics.com/rev-45-1896/",
  },
];

export default defaultItems;
