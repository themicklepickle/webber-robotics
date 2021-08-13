import { connection } from "mongoose";
import connectDB from "../";
import { Vendor, Item } from "../models";

const seed = async () => {
  console.log("Cleaning database");

  await connectDB();
  await connection.dropDatabase();

  console.log("Database clean");

  const vendors = [
    new Vendor({
      name: "Canadian Tire",
      logo: "https://logo.clearbit.com/canadiantire.ca",
    }),
    new Vendor({
      name: "REV Robotics",
      logo: "https://logo.clearbit.com/revrobotics.com",
    }),
    new Vendor({
      name: "AliExpress",
      logo: "https://logo.clearbit.com/aliexpress.com",
    }),
  ];

  const items = [
    new Item({
      name: "Gorilla Glue Super Glue Adhesive",
      priority: "High",
      description: "For bonding material",
      unitPrice: 8.99,
      quantity: 1,
      unitPriceCurrency: "CAD",
      isPurchased: false,
      datePurchased: "2021-08-01T06:08:08.646Z",
      url: "https://www.canadiantire.ca/en/pdp/gorilla-glue-super-glue-adhesive-0670301p.html#srp",
      vendor: vendors[0]._id,
    }),
    new Item({
      name: "90mm Omni Wheels - 2 Pack",
      priority: "High",
      description: "For omni-chassis",
      unitPrice: 22,
      quantity: 3,
      unitPriceCurrency: "USD",
      isPurchased: false,
      datePurchased: "2021-08-01T06:15:13.217Z",
      url: "https://www.revrobotics.com/rev-41-1190/",
      vendor: vendors[1]._id,
    }),
    new Item({
      name: "M3 X 8MM T-Slot Screw - 100 Pack",
      priority: "High",
      description: "Screws for connecting REV components",
      unitPrice: 16,
      quantity: 1,
      unitPriceCurrency: "USD",
      isPurchased: false,
      datePurchased: "2021-08-01T06:17:59.156Z",
      url: "https://www.revrobotics.com/rev-41-1167/",
      vendor: vendors[1]._id,
    }),
    new Item({
      name: "Ball Bearings 3mm x 8mm x 4mm 10 pack",
      priority: "Low",
      description: "Ball bearings for custom linear slide assembly",
      unitPrice: 6.64,
      quantity: 2,
      unitPriceCurrency: "USD",
      isPurchased: false,
      datePurchased: "2021-08-01T06:24:05.519Z",
      url: "https://www.aliexpress.com/item/557757520.html?spm=2114.search0302.3.10.4525cd22Aios8t&ws_ab_test=searchweb0_0,searchweb201602_0,searchweb201603_0,ppcSwitch_0&algo_pvid=258f9e14-b402-4b35-84ff-84171d59e137&algo_expid=258f9e14-b402-4b35-84ff-84171d59e137-1",
      vendor: vendors[2]._id,
    }),
  ];

  const savings = [
    ...vendors.map((vendor) => vendor.save()),
    ...items.map((item) => item.save()),
  ];

  await Promise.all(savings);

  console.log("Database seeded");

  connection.close();
};

seed();
