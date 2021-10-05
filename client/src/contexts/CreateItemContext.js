import { createContext } from "react";

const CreateItemContext = createContext({
  itemDetails: {},
  setItemDetails: () => {},
  setItemDetail: () => {},
  errors: [],
  setErrors: () => {},
  nextStep: () => {},
  previousStep: () => {},
  close: () => {},
});

export default CreateItemContext;
