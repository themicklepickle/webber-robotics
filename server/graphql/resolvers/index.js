import { itemQueries, itemMutations, itemFields } from "./item";
import { vendorQueries, vendorMutations, vendorFields } from "./vendor";
import { itemDetailsQueries } from "./itemDetails";

const resolvers = {
  Query: {
    ...itemQueries,
    ...vendorQueries,
    ...itemDetailsQueries,
  },
  Mutation: {
    ...itemMutations,
    ...vendorMutations,
  },
  ...itemFields,
  ...vendorFields,
};

export default resolvers;
