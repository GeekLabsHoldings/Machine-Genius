function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString().split(",")[0]; // You can customize the format as needed
}

export default convertTimestampToDate;
    