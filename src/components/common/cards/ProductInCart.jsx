import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeAll
} from "../../../redux/feature/cart/cartSlice";

export default function ProductInCart({ image, title, desc, price, id, qty }) {
  const dispatch = useDispatch();
  // handel increase Quantity
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity({ id }));
  };
  // handle decrease Quantity
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity({ id }));
  };

  return (
    <>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil image"
                  height="40"
                  src={image}
                  width="40"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[20px] font-medium text-gray-900 dark:text-white">
                  {title}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {desc}
                </p>
                <div className="flex mt-2">
                  <button
                    onClick={() => handleDecreaseQuantity()}
                    className="mr-2 px-2 py-1 bg-slate-200 rounded-sm"
                  >
                    -
                  </button>
                  <p className="px-2 py-1 bg-slate-200 rounded-sm">{qty}</p>
                  <button
                    onClick={() => handleIncreaseQuantity()}
                    className="ml-2 px-2 py-1 bg-slate-200 rounded-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {price}$
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
