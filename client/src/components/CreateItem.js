import { useState } from "react";

import { Box, Dialog, DialogTitle } from "@material-ui/core";

import { useStep } from "../hooks";
import {
  CreateItemSearch,
  CreateItemForm,
  CreateItemFinalize,
} from "../components";
import { CreateItemContext } from "../contexts";

const CreateItem = ({ isOpen, closeModal, budgetId }) => {
  const defaultItem = {
    name: "",
    description: "",
    vendor: {
      name: "",
      logo: "",
    },
    url: "",
    unitPrice: "",
    unitPriceCurrency: "CAD",
    quantity: 1,
    priority: "Medium",
    isPurchased: false,
    datePurchased: new Date(),
    image: "",
    budgetId,
  };

  const { step, nextStep, previousStep, setInitialStep } = useStep(3);
  const [itemDetails, setItemDetails] = useState(defaultItem);
  const [errors, setErrors] = useState({});

  const setItemDetail = (field, value) => {
    let newItemDetails = { ...itemDetails };
    newItemDetails[field] = value;
    setItemDetails(newItemDetails);
  };

  const close = () => {
    setInitialStep();
    setItemDetails(defaultItem);
    setErrors({});
    closeModal();
  };

  return (
    <CreateItemContext.Provider
      value={{
        itemDetails,
        setItemDetails,
        setItemDetail,
        errors,
        setErrors,
        nextStep,
        previousStep,
        close,
      }}
    >
      <Dialog open={isOpen} onClose={close} fullWidth>
        <DialogTitle style={{ textAlign: "center" }}>
          <Box fontWeight={500}>Create Item</Box>
        </DialogTitle>
        {step === 1 && <CreateItemSearch />}
        {step === 2 && <CreateItemForm />}
        {step === 3 && <CreateItemFinalize />}
      </Dialog>
    </CreateItemContext.Provider>
  );
};

export default CreateItem;
