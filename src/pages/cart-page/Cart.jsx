import React from "react";
import { Card } from "flowbite-react";
import { ProductListCard } from "../../components/common/cards/ProductListCard";
import { removeAll, selectCartITems } from "../../redux/feature/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartITems);
  console.log("cartItems", cartItems);
  return (
    <section className="flex justify-center mt-2">
      <div className="max-w-sm w-1/2 bg-slate-50 rounded-md p-5">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Shopping Cart
          </h5>
          <button
            onClick={() => dispatch(removeAll())}
            className="text-sm font-medium text-red-600 hover:underline dark:text-cyan-500"
          >
            Remove all
          </button>
        </div>
        {cartItems.map((item, index) => {
          return (
            <ProductListCard
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              desc={item.desc}
              id={item.id}
              qty={item.qty}
            />
          );
        })}
      </div>
    </section>
  );
}
