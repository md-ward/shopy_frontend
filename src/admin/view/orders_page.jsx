import { useEffect } from "react";
import useDashboardFeaturesStore from "../store/useDashboardFeaturesStore";

import Loader from "../../global/widgets/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import OrderDetails from "../widgets/order_details";
import { useState } from "react";
import dateFormater from "../../global/dateFromater";
import statusColor from "../../global/orderStatusColors";

const OrdersPage = () => {
  // !States.....
  const { orders, handleGettingAdminOrders, isLoading } =
    useDashboardFeaturesStore((state) => ({
      orders: state.orders,
      handleGettingAdminOrders: state.handleGettingAdminOrders,
      isLoading: state.isLoading,
    }));
  useEffect(() => {
    handleGettingAdminOrders();
  }, [handleGettingAdminOrders]);

  const [selectedOrderId, setselectedOrderId] = useState(null);

  useEffect(() => {
    const unsubscribe = useDashboardFeaturesStore.subscribe((state, prev) => {
      if (state.orders !== prev.orders) {
        handleCancel();
      }
    });
    return unsubscribe;
  }, []);

  //! cancle and close the order detials  componenet
  function handleSelectOrder(orderId) {
    setselectedOrderId(orderId);
  }
  function handleCancel() {
    setselectedOrderId(null);
  }
  const [selectedOption, setSelectedOption] = useState("All");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const options = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="container relative p-2">
      {isLoading && (
        <div className="absolute inset-0 isolate   flex h-full w-full  items-center justify-center !overflow-hidden bg-gray-300/30 [&_*]:bg-white [&_*]:shadow-lg">
          <Loader />
        </div>
      )}
      {selectedOrderId && (
        <OrderDetails cancel={handleCancel} orderId={selectedOrderId} />
      )}
      <div className="flex  flex-col items-center justify-between px-3 sm:flex-row">
        <h1 className="text-grad my-4 text-3xl font-bold">Orders</h1>
        <div className="relative flex h-fit flex-wrap divide-x divide-gray-600 rounded-md border border-gray-300 bg-gray-200 p-1 text-sm">
          {options.map((item, index) => (
            <label key={index} className="flex-1 text-center">
              <input
                type="radio"
                name="radio"
                className="hidden"
                checked={selectedOption === item}
                onChange={() => handleOptionChange(item)}
              />
              <span
                className={`flex cursor-pointer items-center justify-center  border-none px-2 py-1 transition-colors duration-150 
                        ${
                          selectedOption === item
                            ? `${statusColor(item)}  bg-white`
                            : `text-gray-500`
                        }`}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>
      <table className="w-full table-auto">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-2 ">View order</th>
            <th className="px-4 py-2">#Order ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody className="[&_td]:border  [&_tr]:text-center  ">
          {orders?.map((order) => (
            <tr
              key={order._id}
              className={`${
                selectedOption === "All" || selectedOption === order.orderStatus
                  ? ""
                  : "hidden"
              }`}
            >
              <td
                onClick={() => handleSelectOrder(order._id)}
                className=" group  relative   box-border cursor-pointer  hover:text-indigo-500"
              >
                <FontAwesomeIcon className="isolate " icon={faEye} />
                <span className="absolute inset-0  -z-10 m-2   box-border hidden origin-left skew-x-6  scale-x-0  bg-slate-200 p-2 duration-200 ease-in-out group-hover:skew-x-0 group-hover:scale-x-100 md:block"></span>
              </td>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td
                className={`select-none border px-4 py-2 ${statusColor(
                  order.orderStatus,
                )}`}
              >
                {order.orderStatus}
              </td>
              <td>{dateFormater(order.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
