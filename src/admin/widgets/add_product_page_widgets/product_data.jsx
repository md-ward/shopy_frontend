const Product_Data = () => {
  return (
    <section className="mt-2 rounded-md border max-sm:mx-2">
      <h1 className="w-full bg-slate-50 p-2 text-center text-lg font-semibold">
        Product data
      </h1>

      <div className="flex flex-col items-center gap-4 pl-2 lg:flex-row">
        <h1>Regular price {"($)"} </h1>
        <input
        required
          placeholder="Regular Price"
          pattern="[0-9]+"
          type="text"
          name="price"
          className="money mb-4 mt-4 rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="flex flex-col items-center gap-4 pl-2 lg:flex-row">
        <h1>Sale price {"($)"} </h1>
        <input
          placeholder="On Sales Price"
          pattern="[0-9]+"
          type="text"
          name="sale_price"
          className="money mx-6 mb-4 mt-4 rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mb-2 flex flex-col items-center gap-4 pl-2 lg:flex-row">
        <h1>Quantity in Stock </h1>
        <input
        required
          placeholder="Quantity"
          pattern="[0-9]+"
          type="text"
          name="quantity_in_stock"
          className="money rounded border border-gray-300 px-3 py-2"
        />
      </div>
    </section>
  );
};

export default Product_Data;
