import React from "react";
import "./pageCatalog.scss";
import { ProductFilter, ProductCatalog } from "components";

export const PageCatalog = () => {
  return (
    <main className="page-main">
      <ProductFilter />
      <ProductCatalog />
    </main>
  );
};
