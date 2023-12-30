function dateFormater(timeStamp) {
  const date = new Date(timeStamp);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-GB", options);
}

export default dateFormater;
