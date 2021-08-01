import { itemQueries, itemMutations, itemFields } from "./item";
import { vendorQueries, vendorMutations, vendorFields } from "./vendor";

const resolvers = {
  Query: {
    ...itemQueries,
    ...vendorQueries,
  },
  Mutation: {
    ...itemMutations,
    ...vendorMutations,
  },
  ...itemFields,
  ...vendorFields,
};

export default resolvers;
