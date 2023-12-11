const Product_Data = () => {
    return (
      <section className="mt-2 max-sm:mx-2 border rounded-md">
        <h1 className="text-center w-full p-2 text-lg font-semibold bg-slate-50">
          Product data
        </h1>
  
        <div className="flex flex-col lg:flex-row items-center gap-4 pl-2">
          <h1>Regular price {'($)'} </h1>
          <input
            placeholder="Regular Price"
            pattern="[0-9]+"
            type="text"
            name="regular price"
            className="money border border-gray-300 rounded px-3 py-2 mb-4 mt-4"
          />
        </div>
  
        <div className="flex flex-col lg:flex-row items-center gap-4 pl-2">
          <h1>Sale price {'($)'} </h1>
          <input
            placeholder="On Sales Price"
            pattern="[0-9]+"
            type="text"
            name="sales price"
            className="money border border-gray-300 rounded mx-6 px-3 py-2 mb-4 mt-4"
          />
        </div>
  
        <div className="flex flex-col mb-2 lg:flex-row items-center gap-4 pl-2">
          <h1>Quantity in Stock </h1>
          <input
            placeholder="Quantity"
            pattern="[0-9]+"
            type="text"
            name="Quantity"
            className="money border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </section>
    );
  };
  
  export default Product_Data;