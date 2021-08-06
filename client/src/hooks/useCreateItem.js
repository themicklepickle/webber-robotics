import { useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import CREATE_ITEM from "../graphql/mutations/createItem";

import { shortCurrencyList, longCurrencyList } from "../utils/currencyLists";
import { toTitleCase } from "../utils/capitalization";

const fetchItemData = async (url) => {
  return {};
};

const useCreateItem = (setInitialStep) => {
  const defaultItem = {
    name: "",
    description: "",
    vendor: {
      name: "",
      logo: "",
      domain: "",
    },
    url: "",
    unitPrice: "",
    unitPriceCurrency: "CAD",
    quantity: 1,
    priority: "Medium",
    isPurchased: false,
    datePurchased: new Date(),
    image: "",
  };

  const [searchURL, setSearchURL] = useState("");
  const [loadingItems, setLoadingItems] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [gotResult, setGotResult] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currencies, setCurrencies] = useState(shortCurrencyList);
  const [currencySelectIsOpen, setCurrencySelectIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultItem);
  const [suggestedVendors, setSuggestedVendors] = useState([]);
  const [vendorInputValue, setVendorInputValue] = useState("");
  const [errors, setErrors] = useState({});
  const [createItem] = useMutation(CREATE_ITEM, {
    refetchQueries: ["GetItems"],
  });

  useEffect(() => {
    if (!itemData) return;

    const itemDataIsEmpty = Object.keys(itemData).length === 0;

    setNoResults(itemDataIsEmpty);
    setGotResult(!itemDataIsEmpty);
    setFormValues((formValues) => Object.assign(formValues, itemData));
    setVendorInputValue(itemData.vendor?.name);
  }, [itemData]);

  useEffect(() => {
    const autocompleteVendors = async () => {
      if (!vendorInputValue || vendorInputValue.charAt(0) === " ") {
        setSuggestedVendors([]);
        return;
      }

      const response = await fetch(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${vendorInputValue}`
      );
      const suggestions = await response.json();

      if (suggestions.message) return; // API error

      setSuggestedVendors(suggestions);
    };
    autocompleteVendors();
  }, [vendorInputValue]);

  const priorities = ["Low", "Medium", "High"]; // TODO: make this a prop

  const search = async () => {
    setItemData(null);
    setLoadingItems(true);

    setGotResult(false);
    setNoResults(false);

    const data = await fetchItemData(searchURL);

    setItemData(data);
    setLoadingItems(false);
  };

  const reset = () => {
    setSearchURL("");
    setItemData(null);
    setInitialStep();
    setCurrencies(shortCurrencyList);
    setFormValues(defaultItem);
    setSuggestedVendors([]);
    setVendorInputValue("");
    setErrors({});
  };

  const expandCurrencies = () => {
    setCurrencies(longCurrencyList);
  };

  const openCurrencySelect = () => {
    setCurrencySelectIsOpen(true);
  };

  const closeCurrencySelect = () => {
    setCurrencySelectIsOpen(false);
  };

  const handleFormChange = async (e) => {
    const field = e.target.name;
    let value = e.target.value;

    if (field === "unitPrice") value = parseFloat(value);

    setFormValues({ ...formValues, [field]: value });
  };

  const handleUnitPriceCurrencyChange = async (e) => {
    const newValue = e.target.value;

    if (newValue === "more") {
      expandCurrencies();
    } else {
      // setFormValues({ ...formValues, unitPriceCurrency: newValue });
      handleFormChange(e);
      closeCurrencySelect();
    }
  };

  const handleVendorInputChange = async (e, newValue, reason) => {
    if (reason === "reset" && newValue === "") return;

    setVendorInputValue(newValue);
  };

  const handleVendorChange = async (e, newVendor) => {
    setFormValues({ ...formValues, vendor: newVendor });
  };

  const handleDatePurchasedChange = async (newDatePurchased) => {
    setFormValues({ ...formValues, datePurchased: newDatePurchased });
  };

  const setQuantity = (newQuantity) => {
    setFormValues({ ...formValues, quantity: parseFloat(newQuantity) });
  };

  const calculatePriorityValue = (prioritiesArray, index) => {
    return (100 / (prioritiesArray.length - 1)) * index;
  };

  const getPriorityValue = () => {
    return calculatePriorityValue(
      priorities,
      priorities.indexOf(formValues.priority)
    );
  };

  const calculatePriorityLevel = (value, prioritiesArray) => {
    const index = value / (100 / (prioritiesArray.length - 1));

    return prioritiesArray[index];
  };

  const handlePriorityChange = async (e, newPriorityValue) => {
    const newPriorityLevel = calculatePriorityLevel(
      newPriorityValue,
      priorities
    );

    setFormValues({ ...formValues, priority: newPriorityLevel });
  };

  const getPriorityMarks = () => {
    return priorities.map((priority, idx, array) => ({
      value: calculatePriorityValue(array, idx),
      label: priority,
    }));
  };

  const handleIsPurchasedChange = (e) => {
    const value = e.target.checked;

    if (!value) setFormValues({ ...formValues, datePurchased: "" });

    setFormValues({ ...formValues, isPurchased: value });
  };

  const executeCreateItem = () => {
    createItem({
      variables: formValues,
    });
  };

  const getTextFieldProps = (fieldName, propsToOmit = {}) => {
    const commonProps = {
      autoComplete: propsToOmit.autoComplete ? undefined : "off",
      spellCheck: propsToOmit.spellCheck ? undefined : false,
      fullWidth: propsToOmit.fullWidth ? undefined : true,
      variant: propsToOmit.variant ? undefined : "standard",
    };

    const uniqueProps = {
      name: propsToOmit.name ? undefined : fieldName,
      label: propsToOmit.label ? undefined : toTitleCase(fieldName),
      value: propsToOmit.value ? undefined : formValues[fieldName],
      error: propsToOmit.error ? undefined : errors[fieldName],
      onChange: propsToOmit.onChange ? undefined : handleFormChange,
    };

    return Object.assign(commonProps, uniqueProps);
  };

  const validateItemDetails = () => {
    const newErrors = {
      name: formValues.name === "",
      description: formValues.name === "",
      url: formValues.url === "",
      vendor: !formValues.vendor || formValues.vendor.name === "",
      currency: formValues.currency === "",
      unitPrice: formValues.unitPrice <= 0,
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === false);
  };

  return {
    reset,
    searchURL,
    setSearchURL,
    search,
    loadingItems,
    itemData,
    gotResult,
    noResults,
    currencies,
    currencySelectIsOpen,
    openCurrencySelect,
    closeCurrencySelect,
    handleUnitPriceCurrencyChange,
    formValues,
    handleFormChange,
    setQuantity,
    executeCreateItem,
    handleDatePurchasedChange,
    getPriorityMarks,
    handlePriorityChange,
    getPriorityValue,
    handleIsPurchasedChange,
    suggestedVendors,
    vendorInputValue,
    handleVendorInputChange,
    handleVendorChange,
    getTextFieldProps,
    validateItemDetails,
  };
};

export default useCreateItem;
