const Item = require("../models/item");
const Vendor = require("../models/vendor");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const VendorType = new GraphQLObjectType({
  name: "Vendor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    domain: { type: GraphQLString },
    logo: { type: GraphQLString },
    items: {
      type: GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.find({ vendorId: parent.id });
        // return _.filter(items, { vendorId: parent.id });
      },
    },
  }),
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    priority: { type: GraphQLString },
    description: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    unitPrice: { type: GraphQLFloat },
    unitPriceCurrency: { type: GraphQLString },
    isPurchased: { type: GraphQLBoolean },
    datePurchased: { type: GraphQLString },
    url: { type: GraphQLString },
    image: { type: GraphQLString },
    vendor: {
      type: VendorType,
      resolve(parent, args) {
        return Vendor.findById(parent.vendorId);
        // return _.find(vendors, { id: parent.vendorId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    item: {
      type: ItemType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Item.findById(args.id);
        // return _.find(items, { id: args.id });
      },
    },
    vendor: {
      type: VendorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Vendor.findById(args.id);
        // return _.find(vendors, { id: args.id });
      },
    },
    items: {
      type: GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.find({});
      },
    },
    vendors: {
      type: GraphQLList(VendorType),
      resolve(parent, args) {
        return Vendor.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addVendor: {
      type: VendorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        logo: { type: new GraphQLNonNull(GraphQLString) },
        domain: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const vendor = new Vendor({
          name: args.name,
          logo: args.logo,
          domain: args.domain,
        });
        return vendor.save();
      },
    },
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        unitPrice: { type: new GraphQLNonNull(GraphQLFloat) },
        unitPriceCurrency: { type: new GraphQLNonNull(GraphQLString) },
        isPurchased: { type: new GraphQLNonNull(GraphQLBoolean) },
        datePurchased: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
        vendorName: { type: new GraphQLNonNull(GraphQLString) },
        vendorLogo: { type: new GraphQLNonNull(GraphQLString) },
        vendorDomain: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        // search for vendor details
        let vendor = await Vendor.findOne(
          {
            name: args.vendorName,
            logo: args.vendorLogo,
            domain: args.vendorDomain,
          },
          "id"
        ).exec();

        if (vendor === null) {
          vendor = new Vendor({
            name: args.vendorName,
            logo: args.vendorLogo,
            domain: args.vendorDomain,
          });
          vendor.save();
        }

        const item = new Item({
          name: args.name,
          priority: args.priority,
          description: args.description,
          quantity: args.quantity,
          unitPrice: args.unitPrice,
          unitPriceCurrency: args.unitPriceCurrency,
          isPurchased: args.isPurchased,
          datePurchased: args.datePurchased,
          url: args.url,
          vendorId: vendor.id,
        });

        return item.save();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
