import React, { useEffect } from "react";
import "./pageCatalog.scss";
import { TProductItem } from "types";
import { productsList } from "data";
import { ProductFilter, ProductCard } from "components";
import { action, useDispatch, useSelector, RootState } from "store";
import { useSearchParams } from "react-router-dom";

export const PageCatalog = () => {
  let [searchParams, setSearchParams] = useSearchParams();
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

  const productsSearch = useSelector(
    (state: RootState) => state.productsSearch
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

  // TODO: move catalog__panel to extend component

  const paramsHandler = (newParam: {
    sort?: string;
    view?: string;
    search?: string;
  }) => {
    const params: {
      sort?: string;
      view?: string;
      search?: string;
    } = {};
    const sort = searchParams.get("sort");
    const view = searchParams.get("view");
    const search = searchParams.get("search");
    if (sort) params.sort = sort;
    if (view) params.view = view;
    if (search) params.search = search;
    Object.assign(params, newParam);
    setSearchParams(params);
  };

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort) dispatch(action.setProductsSort(sort));

    const search = searchParams.get("search");
    if (search) dispatch(action.setProductsSearch(search));

    const view = searchParams.get("view");
    if (view) dispatch(action.setProductsView(view));
  }, [searchParams]);

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
                paramsHandler({ sort: select.value });
              }}
            >
              <option value="default" selected={productsSort === ""}>
                Default
              </option>
              <option value="price-ASC" selected={productsSort === "price-ASC"}>
                Sort by price ASC
              </option>
              <option
                value="price-DESC"
                selected={productsSort === "price-DESC"}
              >
                Sort by price DESC
              </option>
              <option
                value="rating-ASC"
                selected={productsSort === "rating-ASC"}
              >
                Sort by rating ASC
              </option>
              <option
                value="rating-DESC"
                selected={productsSort === "rating-DESC"}
              >
                Sort by rating DESC
              </option>
              <option
                value="discount-ASC"
                selected={productsSort === "discount-ASC"}
              >
                Sort by discount ASC
              </option>
              <option
                value="discount-DESC"
                selected={productsSort === "discount-DESC"}
              >
                Sort by discount DESC
              </option>
            </select>
          </span>
          <span>Found: {filteredList.length}</span>
          <span>
            <input
              className="catalog__search-field"
              type="text"
              value={productsSearch || ""}
              onChange={(event: any) => {
                const message = event.target.value;
                console.log(event.target.value);
                dispatch(action.setProductsSearch(message));
                paramsHandler({ search: message });
              }}
            />

            <input
              type="radio"
              name="view"
              value="big"
              checked={productsView === "big"}
              onChange={(event: any) => {
                console.log("big");
                dispatch(action.setProductsView("big"));
                paramsHandler({ view: "big" });
              }}
            />
            <input
              type="radio"
              name="view"
              value="small"
              checked={productsView === "small"}
              onChange={(event: any) => {
                console.log("small");
                dispatch(action.setProductsView("small"));
                paramsHandler({ view: "small" });
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
    </main>
  );
};
