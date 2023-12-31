import { useEffect, useState } from "react";
import ViewContactusMessages from "./view_contactus_messages";
import useDashboardFeaturesStore from "../store/useDashboardFeaturesStore";

const StatisticsPage = () => {
  const { statistics, handleGettingStatistics } = useDashboardFeaturesStore(
    (state) => ({
      statistics: state.statistics,
      handleGettingStatistics: state.handleGettingStatistics,
    }),
  );

  useEffect(() => {
    handleGettingStatistics();
  }, [handleGettingStatistics]);

  const [toggleContactUs, setToggleContactUs] = useState(false);

  return (
    <div className=" relative flex w-full flex-col p-6">
      {toggleContactUs && (
        <ViewContactusMessages setToggleContactUs={setToggleContactUs} />
      )}

      <h1 className="mb-4 text-2xl font-bold">Statistics</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Registered Users</h2>
          <p className="text-3xl font-bold">{statistics?.registeredUsers}</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Total Comments</h2>
          <p className="text-3xl font-bold">{statistics?.totalComments}</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold">{statistics?.totalOrders}</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Total Products</h2>
          <p className="text-3xl font-bold">{statistics?.totalProducts}</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Total Sales Revenue</h2>
          <p className="text-3xl font-bold">${statistics?.totalSalesRevenue}</p>
        </div>

        <div
          onClick={() => setToggleContactUs(!toggleContactUs)}
          className="rounded-lg bg-white p-4 shadow-md  hover:cursor-pointer"
        >
          <h2 className="mb-2 text-lg font-semibold">Total Contact Messages</h2>
          <p className="text-3xl font-bold">
            {statistics?.totalContactMessages}
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Average Product Rating</h2>
          <p className="text-3xl font-bold">
            {statistics?.averageProductRating}
          </p>
        </div>
      </div>
      <section className="flex w-full flex-col">
        <h2 className="mt-8 text-2xl font-semibold text-gray-800">
          Popular Products
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statistics?.popularProducts.map((product) => (
            <div
              className="flex flex-col items-center rounded-md bg-white p-2 shadow-md"
              key={product.productId}
            >
              <div className="mb-2 flex h-40 w-full items-center justify-center rounded-md bg-gray-200">
                <img
                  src={product.thumbnailUrl}
                  alt={product.image_alt}
                  className="h-auto max-h-full"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800">
                  {product.productName}
                </p>
                <p className="text-xs text-gray-600">
                  {product.count} units sold
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StatisticsPage;
