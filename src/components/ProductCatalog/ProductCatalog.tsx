import React, { useEffect } from "react";
import "../Style/main.scss";
import { TProductItem } from "types";
import { productsList } from "data";
import { ProductCard } from "components";
import { action, useDispatch, useSelector, RootState } from "store";
import { useSearchParams } from "react-router-dom";
import { paramsHandler } from "helpers";

export const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const filterCategory: string[] = useSelector(
    (state: RootState) => state.filterCategory
  );

  const filterBrand: string[] = useSelector(
    (state: RootState) => state.filterBrand
  );

  const [priceMin, priceMax] = useSelector(
    (state: RootState) => state.filterPrice
  );

  const [stockMin, stockMax] = useSelector(
    (state: RootState) => state.filterStock
  );

  const productsSort: string = useSelector(
    (state: RootState) => state.productsSort
  );

  const productsSearch: string = useSelector(
    (state: RootState) => state.productsSearch
  );

  let filteredList: TProductItem[] = [...productsList];

  if (filterCategory.length > 0)
    filteredList = filteredList.filter((productItem: TProductItem) =>
      filterCategory.includes(productItem.category)
    );

  if (filterBrand.length > 0)
    filteredList = filteredList.filter((productItem: TProductItem) =>
      filterBrand.includes(productItem.brand)
    );

  if (priceMin > 0 && priceMax > 0)
    filteredList = filteredList.filter(
      (productItem: TProductItem) =>
        productItem.price >= priceMin && productItem.price <= priceMax
    );

  if (stockMin > 0 && stockMax > 0)
    filteredList = filteredList.filter(
      (productItem: TProductItem) =>
        productItem.stock >= stockMin && productItem.stock <= stockMax
    );

  if (productsSearch.length > 0)
    filteredList = filteredList.filter((productItem: TProductItem) => {
      const search = productsSearch.toLocaleLowerCase();
      if (productItem.category.toLowerCase().indexOf(search) > -1) return true;
      if (productItem.brand.toLowerCase().indexOf(search) > -1) return true;
      if (productItem.title.toLowerCase().indexOf(search) > -1) return true;
      if (productItem.description.toLowerCase().indexOf(search) > -1)
        return true;
      if (productItem.price.toString().indexOf(search) > -1) return true;
      if (productItem.stock.toString().indexOf(search) > -1) return true;
      return false;
    });

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

  const productsView: string = useSelector(
    (state: RootState) => state.productsView
  );

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort) dispatch(action.setProductsSort(sort));

    const search = searchParams.get("search");
    if (search) dispatch(action.setProductsSearch(search));

    const view = searchParams.get("view");
    if (view) dispatch(action.setProductsView(view));
  }, []);

  return (
    <section className="catalog">
      <div className="catalog__panel">
        <span>
          <select
            name="sort"
            value={productsSort}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const select = event.target as HTMLSelectElement;
              console.log(select.value);
              dispatch(action.setProductsSort(select.value));
              paramsHandler(
                { sort: select.value },
                searchParams,
                setSearchParams
              );
            }}
          >
            <option value="">Default</option>
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
          <input
            className="catalog__search-field"
            type="text"
            value={productsSearch || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const input = event.target as HTMLInputElement;
              dispatch(action.setProductsSearch(input.value));
              paramsHandler(
                { search: input.value },
                searchParams,
                setSearchParams
              );
            }}
          />

          <input
            type="radio"
            name="view"
            value="big"
            checked={productsView === "big"}
            onChange={() => {
              dispatch(action.setProductsView("big"));
              paramsHandler({ view: "big" }, searchParams, setSearchParams);
            }}
          />
          <input
            type="radio"
            name="view"
            value="small"
            checked={productsView === "small"}
            onChange={() => {
              dispatch(action.setProductsView("small"));
              paramsHandler({ view: "small" }, searchParams, setSearchParams);
            }}
          />
        </span>
      </div>
      {filteredList.length > 0 && (
        <div className={`catalog__prod-list ${productsView}`}>
          {filteredList.map((productItem: TProductItem) => (
            <ProductCard product={productItem} key={productItem.id} />
          ))}
        </div>
      )}
      {filteredList.length === 0 && (
        <div className="catalog__empty-list">
          <p>:(</p>
          <p>No products found</p>
        </div>
      )}
    </section>
  );
};
