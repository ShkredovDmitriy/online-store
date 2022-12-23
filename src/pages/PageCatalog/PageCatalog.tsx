import React from "react";
import "./pageCatalog.scss";
import { TProductItem } from "types";
import { productsList } from "data";
import { ProductFilter, ProductCard } from "components";
import { useSelector, RootState } from "store";

export const PageCatalog = () => {
  const filterCategory = useSelector(
    (state: RootState) => state.filterCategory
  ) as string[];

  const filterBrand = useSelector(
    (state: RootState) => state.filterBrand
  ) as string[];

  console.log(filterCategory);
  console.log(filterBrand);

  let filteredList: TProductItem[] = [...productsList];

  if (filterCategory.length > 0)
    filteredList = filteredList.filter((productItem: TProductItem) =>
      filterCategory.includes(productItem.category)
    );

  if (filterBrand.length > 0)
    filteredList = filteredList.filter((productItem: TProductItem) =>
      filterBrand.includes(productItem.brand)
    );

  return (
    <main className="page-main">
      <ProductFilter />
      <section className="catalog">
        {filteredList.length > 0 &&
          filteredList.map((productItem: TProductItem) => (
            <ProductCard product={productItem} key={productItem.id} />
          ))}
        {filteredList.length === 0 && <>No product found</>}
      </section>
    </main>
  );
};
