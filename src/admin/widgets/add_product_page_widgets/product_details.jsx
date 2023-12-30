const Product_Details = () => {
  return (
    <section className=" flex  flex-col  justify-center  rounded-md border max-sm:mx-2 ">
      <h1 className=" w-full bg-slate-50 p-2  text-center  text-lg font-semibold ">
        Product details
      </h1>
      <input
        required
        placeholder="Product Name"
        type="text"
        name="product_name"
        className="mx-2 my-2 w-[95%] rounded border border-gray-300    p-2"
      />

      <textarea
        spellCheck
        required
        placeholder="Product description"
        rows={5}
        name="description"
        className="  mx-2 my-2 w-[95%] rounded border border-gray-300    p-2 focus:border-indigo-600"
      />
    </section>
  );
};
export default Product_Details;
