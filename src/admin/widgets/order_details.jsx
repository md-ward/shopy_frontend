import { useEffect, useState } from "react";
import Loader from "../../global/widgets/loader";
import useDashboardFeaturesStore from "../store/useDashboardFeaturesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import statusColor from "../../global/orderStatusColors";
import PropTypes from "prop-types";

const OrderDetails = ({ orderId, cancel }) => {
  const {
    singleOrderDetails,
    handleGettingAdminOrderDetails,
    isLoading,
    handleUpdatingOrderStatus,
  } = useDashboardFeaturesStore((state) => ({
    singleOrderDetails: state.singleOrderDetails,
    handleGettingAdminOrderDetails: state.handleGettingAdminOrderDetails,
    isLoading: state.isLoading,
    handleUpdatingOrderStatus: state.handleUpdatingOrderStatus,
  }));

  useEffect(() => {
    handleGettingAdminOrderDetails(orderId);
    console.count();
  }, [handleGettingAdminOrderDetails, orderId]);

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = () => {
    handleUpdatingOrderStatus(orderId, selectedStatus);
  };

  const handleDropdownChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className=" neumorphism-shadow absolute z-50  h-fit max-h-screen w-full max-w-7xl rounded-md bg-slate-500">
      {isLoading && <Loader />}

      <div className="bg-white p-4 shadow-md">
        <span className="flex justify-between">
          <h3 className="mb-4 text-2xl font-bold">Billing Details</h3>
          <FontAwesomeIcon
            className="aspect-square cursor-pointer rounded-full bg-gray-500 p-2 text-white ring-gray-400 hover:ring"
            onClick={cancel}
            icon={faClose}
          />
        </span>
        <hr className="mb-4 border-b-2" />
        <p>
          <strong>Customer Name:</strong> {singleOrderDetails?.customer.name}
        </p>
        <p>
          <strong>Address:</strong> {singleOrderDetails?.address}
        </p>
        <p>
          <strong>City:</strong> {singleOrderDetails?.city}
        </p>
        <p>
          <strong>Zip:</strong> {singleOrderDetails?.zip}
        </p>
        <p>
          <strong>Phone:</strong> {singleOrderDetails?.phone}
        </p>
        <p>
          <strong>Email:</strong> {singleOrderDetails?.customer.email}
        </p>
        <h3 className="mb-4 mt-8 text-2xl font-bold">Product Details</h3>
        <hr className="mb-4 border-b-2" />
        <div className="custom-scrollbar max-h-60  overflow-y-auto">
          <table className="mb-8 w-full">
            <thead>
              <tr>
                <th className="text-left">Product Name</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Price</th>
                <th className="text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {singleOrderDetails?.products.map((item, index) => (
                <tr key={index}>
                  <td>{item.productId.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.productId.price}</td>
                  <td>$ {item.productId.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-2xl font-bold">
          Total Price: ${singleOrderDetails?.totalPrice}
        </h3>
        <span className="neumorphism-shadow mt-2  flex w-fit gap-2 rounded-md px-2 py-1">
          <h1>Current status :</h1>
          <p className={`    ${statusColor(singleOrderDetails?.orderStatus)}`}>
            {singleOrderDetails?.orderStatus}
          </p>
        </span>

        {singleOrderDetails?.orderStatus !== "Delivered" && (
          <div className="mt-8 flex ">
            <label htmlFor="status" className="mr-2">
              Change Status:
            </label>
            <select
              id="status"
              className=" rounded border border-gray-300 px-3 py-1"
              value={selectedStatus}
              onChange={handleDropdownChange}
            >
              <option value="">Select status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              className="custom-button"
              onClick={handleStatusChange}
              disabled={!selectedStatus}
            >
              Update Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
OrderDetails.propTypes = {
  cancel: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default OrderDetails;
