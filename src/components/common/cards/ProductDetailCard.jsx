import { Card } from "flowbite-react";

export function ProductDetailCard({ image, title, desc, price }) {
  return (
    <Card className="max-w-sm " horizontal>
      <div className="flex ">
        <img
          src={
            image ||
            "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
          }
          alt={title || "product image"}
          className="h-[200px]"
        />
        <div className="flex flex-col justify-center pl-5">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title || "Unknown"}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {desc || "Unknown"}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price ? price : "unknown"}
          </p>
        </div>
      </div>
    </Card>
  );
}
