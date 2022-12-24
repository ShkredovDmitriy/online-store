import React from "react";
import "./pageCatalog.scss";
import { TProductItem } from "types";
import { productsList } from "data";
import { ProductFilter, ProductCard } from "components";
import { action, useDispatch, useSelector, RootState } from "store";

export const PageCatalog = () => {
  const dispatch = useDispatch();

  const filterCategory = useSelector(
    (state: RootState) => state.filterCategory
  ) as string[];

  const filterBrand = useSelector(
    (state: RootState) => state.filterBrand
  ) as string[];

  const productsSort = useSelector(
    (state: RootState) => state.productsSort
  ) as string;

  let filteredList: TProductItem[] = [...productsList];

  if (filterCategory.length > 0)
    filteredList = filteredList.filter((productItem: TProductItem) =>
      filterCategory.includes(productItem.category)
    );

  if (filterBrand.length > 0)
    filteredList = filteredList.filter((productItem: TProductItem) =>
      filterBrand.includes(productItem.brand)
    );

  if (productsSort === "price-ASC")
    filteredList.sort(
      (productItemA: TProductItem, productItemB: TProductItem) =>
        productItemA.price - productItemB.price
    );
  if (productsSort === "price-DESC")
    filteredList.sort(
      (productItemA: TProductItem, productItemB: TProductItem) =>
        productItemB.price - productItemA.price
    );
  if (productsSort === "rating-ASC")
    filteredList.sort(
      (productItemA: TProductItem, productItemB: TProductItem) =>
        productItemA.rating - productItemB.rating
    );
  if (productsSort === "rating-DESC")
    filteredList.sort(
      (productItemA: TProductItem, productItemB: TProductItem) =>
        productItemB.rating - productItemA.rating
    );
  if (productsSort === "discount-ASC")
    filteredList.sort(
      (productItemA: TProductItem, productItemB: TProductItem) =>
        productItemA.discountPercentage - productItemB.discountPercentage
    );
  if (productsSort === "discount-DESC")
    filteredList.sort(
      (productItemA: TProductItem, productItemB: TProductItem) =>
        productItemB.discountPercentage - productItemA.discountPercentage
    );

  // TODO: move catalog__panel to extend component

  return (
    <main className="page-main">
      <ProductFilter />
      <section className="catalog">
        <div className="catalog__panel">
          <span>
            <select
              name="sort"
              onChange={(event: any) => {
                const select = event.target as HTMLSelectElement;
                console.log(select.value);
                dispatch(action.setProductsSort(select.value));
              }}
            >
              <option value="default" selected>
                Default
              </option>
              <option value="price-ASC">Sort by price ASC</option>
              <option value="price-DESC">Sort by price DESC</option>
              <option value="rating-ASC">Sort by rating ASC</option>
              <option value="rating-DESC">Sort by rating DESC</option>
              <option value="discount-ASC">Sort by discount ASC</option>
              <option value="discount-DESC">Sort by discount DESC</option>
            </select>
          </span>
          <span>Found: {filteredList.length}</span>
          <span>
            <input type="radio" name="view" defaultChecked />
            <input type="radio" name="view" />
          </span>
        </div>
        <div className="catalog__prod-list">
          {filteredList.length > 0 &&
            filteredList.map((productItem: TProductItem) => (
              <ProductCard product={productItem} key={productItem.id} />
            ))}
          {filteredList.length === 0 && <>No products found</>}
        </div>
      </section>
    </main>
  );
};
