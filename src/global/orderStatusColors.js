function statusColor(status) {
  switch (status) {
    case "Shipped":
      return "text-orange-600";
    case "Delivered":
      return "text-green-600";
    case "Processing":
      return "text-blue-600";
    case "Cancelled":
      return "text-red-600";
  }
}
export default statusColor;
