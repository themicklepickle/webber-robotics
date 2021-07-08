import { useEffect, useState } from "react";

import { item1, item2, item3 } from "./defaultItemData";

import { shortCurrencyList, longCurrencyList } from "./currencyLists";

const fetchItemData = async (url) => {
  if (url === "hi") return {};
  if (url === "h") return item2;
  if (url === "long") return item3;
  return item1;
};

const useCreateItem = (setInitialStep, addItem) => {
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
  };

  const [searchURL, setSearchURL] = useState("");
  const [loadingItems, setLoadingItems] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [gotResult, setGotResult] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currencies, setCurrencies] = useState(shortCurrencyList);
  const [currencySelectIsOpen, setCurrencySelectIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultItem);

  useEffect(() => {
    if (!itemData) return;

    const itemDataIsEmpty = Object.keys(itemData).length == 0;

    setNoResults(itemDataIsEmpty);
    setGotResult(!itemDataIsEmpty);
    setFormValuesToItemData();
  }, [itemData]);

  const priorities = ["Low", "Medium", "High"]; // TODO: make this a prop

  const setFormValuesToItemData = () => {
    setFormValues(Object.assign(formValues, itemData));
  };

  const search = async () => {
    setItemData(null);
    setLoadingItems(true);

    setGotResult(false);
    setNoResults(false);

    const data = await fetchItemData(searchURL);

    setTimeout(() => {
      setItemData(data);
      setLoadingItems(false);
    }, 1000);
  };

  const reset = () => {
    setSearchURL("");
    setItemData(null);
    setInitialStep();
    setCurrencies(shortCurrencyList);
    setFormValues(defaultItem);
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
    const value = e.target.value;
    const field = e.target.name;

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

  const handleVendorChange = async (e) => {
    const newVendorName = e.target.value;

    setFormValues({
      ...formValues,
      vendor: { ...formValues.vendor, name: newVendorName },
    });
  };

  const handleDatePurchasedChange = async (newDatePurchased) => {
    setFormValues({ ...formValues, datePurchased: newDatePurchased });
  };

  const setQuantity = (newQuantity) => {
    setFormValues({ ...formValues, quantity: newQuantity });
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

  const createItem = () => {
    addItem(formValues);
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
    createItem,
    handleVendorChange,
    handleDatePurchasedChange,
    getPriorityMarks,
    handlePriorityChange,
    getPriorityValue,
    handleIsPurchasedChange,
  };
};

export default useCreateItem;