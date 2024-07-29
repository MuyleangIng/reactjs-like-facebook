import React, { useEffect } from "react";
import { ProductDetailCard } from "../../components/common/cards/ProductDetailCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/feature/product/productSlice";
import { useParams } from "react-router-dom";
// import { selectProductById } from "../../redux/feature/product/productSlice";

export default function ProductDetail() {
  const param = useParams();
  console.log("param", param.id);
  const product = useSelector((state) => state?.product?.product);
  console.log("product", product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductById(param?.id));
  }, []);
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <ProductDetailCard
        image={product.image}
        title={product.name}
        desc={product.desc}
        price={product.price}
      />
    </div>
  );
}
