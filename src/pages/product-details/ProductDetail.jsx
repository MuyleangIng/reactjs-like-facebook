import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  console.log(product);
  return (
    <div>
      <h1>Product detail</h1>
    </div>
  );
}
