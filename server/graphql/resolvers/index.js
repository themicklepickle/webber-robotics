import { itemQueries, itemMutations, itemFields } from "./item";
import { vendorQueries, vendorMutations, vendorFields } from "./vendor";
import { itemDetailsQueries } from "./itemDetails";
import { exchangeRateQueries } from "./exchangeRate";
import { budgetQueries, budgetMutations, budgetFields } from "./budget";

const resolvers = {
  Query: {
    ...itemQueries,
    ...vendorQueries,
    ...itemDetailsQueries,
    ...budgetQueries,
    ...exchangeRateQueries,
  },
  Mutation: {
    ...itemMutations,
    ...vendorMutations,
    ...budgetMutations,
  },
  ...itemFields,
  ...vendorFields,
  ...budgetFields,
};

export default resolvers;
