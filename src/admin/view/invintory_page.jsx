import { useEffect } from "react";
import useDashboardFeaturesStore from "../store/useDashboardFeaturesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import dateFormater from "../../global/dateFromater";

const InventoryPage = () => {
  const navigate = useNavigate();

  function handleEditProductNav(productId) {
    navigate(`/admin/edit/${productId}`);
  }
  const {
    products,
    featured,
    handleGettingProducts,
    handleFeaturedSelection,
    handleFeaturedProductsSaveChanges,
  } = useDashboardFeaturesStore((state) => ({
    products: state.products,
    featured: state.featured,
    handleFeaturedSelection: state.handleFeaturedSelection,
    handleGettingProducts: state.handleGettingProducts,
    handleFeaturedProductsSaveChanges: state.handleFeaturedProductsSaveChanges,
  }));
  useEffect(() => {
    handleGettingProducts();
  }, [handleGettingProducts]);

  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  function handleChangePage(page) {
    window.scrollTo({ top });
    handleGettingProducts(page);
    setSearchParams({ page: page });
  }

  return (
    <div className="container  p-2">
      <span className="flex w-full items-center  justify-between px-4">
        <h1 className="text-grad my-4  font-bold">Inventory</h1>
        <button
          onClick={handleFeaturedProductsSaveChanges}
          className="custom-button"
          type="button"
        >
          Save changes
        </button>
        <nav
          className="isolate flex  cursor-pointer items-center justify-center gap-2 -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() =>
              handleChangePage(Number(searchParams.get("page")) - 1)
            }
            disabled={Number(searchParams.get("page")) <= 1}
            className="relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-100"
          >
            <FontAwesomeIcon className="h-5 w-5" icon={faChevronLeft} />
          </button>

          {Array.from({ length: products.pages }, (_, index) => (
            <span
              onClick={() => handleChangePage(index + 1)}
              className={` relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                products.currentPage == index + 1
                  ? "custome_grad text-white "
                  : ""
              }`}
              key={index}
            >
              {index + 1}
            </span>
          ))}

          <button
            onClick={() =>
              handleChangePage(Number(searchParams.get("page")) + 1)
            }
            disabled={Number(searchParams.get("page")) >= products.pages}
            className="relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-100"
          >
            <FontAwesomeIcon className="h-5 w-5" icon={faChevronRight} />
          </button>
        </nav>
      </span>
      <table className="w-full table-auto">
        <thead className="bg-slate-100">
          <tr>
            <th>Featured</th>
            <th>Edit</th>
            <th>image</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Sale Price</th>
            <th className="px-4 py-2">Quantity in Stock</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {products.products?.map((product, index) => (
            <tr key={product._id}>
              <td className="border  px-4  py-2 has-[:disabled]:bg-gray-100 ">
                <button
                  className="flex w-full items-center justify-center   "
                  onClick={() =>
                    handleFeaturedSelection(
                      product._id,
                      !featured[index].isFeatured,
                    )
                  }
                >
                  <img
                    src={
                      featured[index]?.isFeatured
                        ? "/assets/star-bold.svg"
                        : "/assets/star-outline.svg"
                    }
                    className=" size-7  cursor-pointer hover:scale-105"
                    alt="star icon for featured product selection"
                  />
                </button>
              </td>
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
