import { useDispatch } from "react-redux";
import {
  decreaseQty,
  increaseQty
} from "../../../redux/feature/cart/cartSlice";

export function ProductListCard({ image, title, price, desc, qty, id }) {
  const dispatch = useDispatch();
  // handle increase qty
  const handleIncreaseQty = () => {
    dispatch(increaseQty({ id }));
  };
  // handle decreaseQty
  const handleDecreaseQty = () => {
    dispatch(decreaseQty({ id }));
  };
  return (
    <div className="flow-root">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              <img
                alt={title || "product image"}
                height="40"
                src={
                  image ||
                  "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                }
                width="40"
                className="rounded-full"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[20px] font-medium text-gray-900 dark:text-white">
                {title || "unknown"}
              </p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                {desc || "unknown"}
              </p>
              <div className="flex">
                <button onClick={() => handleDecreaseQty()} className="mr-2">
                  -
                </button>
                <p>{qty}</p>
                <button onClick={() => handleIncreaseQty()} className="ml-2">
                  +
                </button>
              </div>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {price ? price : "unknown"}$
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
