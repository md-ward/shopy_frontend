import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCartStore from "../../cart/store/useCartStore";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const CartTooltip = () => {
  const { total } = useCartStore();

  return (
    <span className="custome_grad  absolute    inset-0 top-11 h-20 w-44   -translate-x-1/2  -translate-y-16    scale-0 rounded-md p-2    delay-500 duration-300 ease-in-out group-hover:block group-hover:translate-y-0   group-hover:scale-100   ">
      <div className=" flex h-full w-full  flex-col   justify-evenly  rounded-md  bg-white p-2 ">
        <h1>Items : {useCartStore.getState().cart?.length}</h1>
        <span className=" flex items-center gap-2">
          <h2>Total: {total} </h2>
          <FontAwesomeIcon icon={faMoneyBill} color="lightGreen" />
        </span>
      </div>
    </span>
  );
};

export default CartTooltip;
