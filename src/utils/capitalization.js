const toTitleCase = (string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
};

export { toTitleCase };
