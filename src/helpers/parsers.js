const fullDateParser = (date) => {
  const hours = date.getHours();
  return `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} at: ${hours}:${date.getMinutes()} ${
    hours > 12 ? "PM" : "AM"
  }`;
};

const dateParser = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export { fullDateParser, dateParser };
