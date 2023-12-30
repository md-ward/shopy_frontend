import { useEffect } from "react";
import useDashboardFeaturesStore from "../store/useDashboardFeaturesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const InventoryPage = () => {
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

  const navigate = useNavigate();

  function handleEditProductNav(productId) {
    navigate(`/admin/edit/${productId}`);
  }
  const { products, handleGettingProducts } = useDashboardFeaturesStore();
  useEffect(() => {
    handleGettingProducts();
  }, [handleGettingProducts]);

  return (
    <div className="container  p-2">
      <h1 className="text-grad my-4  font-bold">Inventory</h1>
      <table className="w-full table-auto">
        <thead className="bg-slate-100">
          <tr>
            <th>Edit</th>
            <th>image</th>
            <th className="px-4 py-2">Product Name</th>
            {/* <th className="px-4 py-2">Description</th> */}
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Sale Price</th>
            <th className="px-4 py-2">Quantity in Stock</th>
            <th className="px-4 py-2">Date</th>
            {/* Add more table headers for additional product details */}
          </tr>
        </thead>

        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">
                <FontAwesomeIcon
                  title="edit product"
                  className="cursor-pointer hover:text-indigo-500"
                  onClick={() => handleEditProductNav(product._id)}
                  type="button"
                  icon={faEdit}
                />
              </td>
              <td className="border p-2">
                <img
                  className="   object-cover"
                  src={product.image.thumbnailUrl}
                  alt={product.image.image_alt}
                />
              </td>
              <td className="border px-4 py-2">{product.product_name}</td>
              {/* <td className="border px-4 py-2">{product.description}</td> */}
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">
                ${product.sale_price ?? "NONE"}
              </td>
              <td className="border px-4 py-2">{product.quantity_in_stock}</td>
              <td className="border px-4 py-2">
                {dateFormater(product.added_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
