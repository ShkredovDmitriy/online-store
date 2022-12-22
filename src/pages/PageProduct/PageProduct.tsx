import React from "react";
import "./pageProduct.scss";
import { useParams } from "react-router-dom";
import { TProductItem } from "types";
import { productsList } from "data";

export const PageProduct = () => {
  const { id } = useParams();
  console.log("PRODUCT ID", id);
  const product = productsList.filter(
    (productItem: TProductItem) => `${productItem.id}` === id
  )[0];

  return <main className="page-product">{product.title}</main>;
};
