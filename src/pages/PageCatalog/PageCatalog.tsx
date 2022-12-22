import React from "react";
import { TProductItem } from "types";
import { productsList } from "data";
import { ProductFilter, ProductCard } from "components";
import "./pageCatalog.scss";

export const PageCatalog = () => {
  return (
    <main className="page-main">
      <ProductFilter />
      <section className="catalog">
        {productsList.map((productItem: TProductItem) => (
          <ProductCard product={productItem} key={productItem.id} />
        ))}
      </section>
    </main>
  );
};
