import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "../../components/common/cards/ProductInCart";
import { selectCartItems, removeAll } from "../../redux/feature/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  //   handle remove all product
  const handleRemoveAllProduct = () => {
    dispatch(removeAll());
  };
  const cartItems = useSelector(selectCartItems);
  console.log("cartItems in cart page", cartItems);
  return (
    <h1>
      </h1>    // <section className="flex justify-center mt-2 ">
    //   <section className="max-w-sm w-1/2 bg-slate-50 p-5 rounded-md overflow-scroll h-[80vh]">
    //     <div className="mb-4 flex items-center justify-between">
    //       <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
    //         Shopping Cart
    //       </h5>
    //       <button
    //         onClick={() => handleRemoveAllProduct()}
    //         className="text-sm font-medium text-red-600 hover:underline dark:text-cyan-500"
    //       >
    //         Delete all
    //       </button>
    //     </div>
    //     {cartItems.map((cartItem, index) => {
    //       return (
    //         <ProductInCart
    //           key={index}
    //           image={cartItem.image}
    //           title={cartItem.title}
    //           desc={cartItem.desc}
    //           id={cartItem.id}
    //           price={cartItem.price}
    //           qty={cartItem.qty}
    //         />
    //       );
    //     })}
    //   </section>
    // </section>
  );
}
