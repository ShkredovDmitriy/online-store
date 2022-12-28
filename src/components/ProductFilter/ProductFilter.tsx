import React, { useState, useEffect } from "react";
import "./productFilter.scss";
import { TProductItem } from "types";
import { productsList } from "data";
import { action, useSelector, RootState } from "store";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { paramsHandler, paramsReset } from "helpers";
import { Range } from "react-range";

type TFilterItem = {
  label: string;
  countTotal: number;
  countFilter: number;
};

export const ProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState([0, 100000]);
  const [stock, setStock] = useState([0, 100000]);
  const [copied, setCopied] = useState("Copy Link");
  const dispatch = useDispatch();

  const filterCategory: string[] = useSelector(
    (state: RootState) => state.filterCategory
  );

  const filterBrand: string[] = useSelector(
    (state: RootState) => state.filterBrand
  );

  const [filterPriceMin, filterPriceMax]: number[] = useSelector(
    (state: RootState) => state.filterPrice
  );

  const [filterStockMin, filterStockMax]: number[] = useSelector(
    (state: RootState) => state.filterStock
  );

  let available: TProductItem[] = [...productsList];

  if (filterCategory.length > 0)
    available = available.filter((productItem: TProductItem) =>
      filterCategory.includes(productItem.category)
    );

  if (filterBrand.length > 0)
    available = available.filter((productItem: TProductItem) =>
      filterBrand.includes(productItem.brand)
    );

  if (filterPriceMin > 0 && filterPriceMax > 0)
    available = available.filter(
      (productItem: TProductItem) =>
        productItem.price >= filterPriceMin &&
        productItem.price <= filterPriceMax
    );

  if (filterStockMin > 0 && filterStockMax > 0)
    available = available.filter(
      (productItem: TProductItem) =>
        productItem.stock >= filterStockMin &&
        productItem.stock <= filterStockMax
    );

  const categoriesList: TFilterItem[] = [];
  const brandsList: TFilterItem[] = [];
  let priceMin = 0;
  let priceMax = 0;
  let stockMin = 0;
  let stockMax = 0;

  productsList.forEach(
    ({ id, category, brand, price, stock }: TProductItem) => {
      const present =
        available.findIndex((availableProduct) => availableProduct.id === id) >
        -1;

      const categoryIndex = categoriesList.findIndex(
        ({ label }) => label === category
      );

      if (categoryIndex > -1) {
        categoriesList[categoryIndex].countTotal += 1;
        if (present) categoriesList[categoryIndex].countFilter += 1;
      } else {
        categoriesList.push({
          label: category,
          countTotal: 1,
          countFilter: present ? 1 : 0,
        });
      }

      const brandIndex = brandsList.findIndex(({ label }) => label === brand);

      if (brandIndex > -1) {
        brandsList[brandIndex].countTotal += 1;
        if (present) brandsList[brandIndex].countFilter += 1;
      } else {
        brandsList.push({
          label: brand,
          countTotal: 1,
          countFilter: present ? 1 : 0,
        });
      }

      if (priceMin === 0) priceMin = price;
      else priceMin = priceMin > price ? price : priceMin;

      if (priceMax === 0) priceMax = price;
      else priceMax = priceMax < price ? price : priceMax;

      if (stockMin === 0) stockMin = stock;
      else stockMin = stockMin > stock ? stock : stockMin;

      if (stockMax === 0) stockMax = stock;
      else stockMax = stockMax < stock ? stock : stockMax;
    }
  );

  if (price[0] < priceMin || price[1] > priceMax) {
    price[0] = priceMin;
    price[1] = priceMax;
  }

  if (stock[0] < stockMin || stock[1] > stockMax) {
    stock[0] = stockMin;
    stock[1] = stockMax;
  }

  const filterReset = () => {
    paramsReset(setSearchParams);
    dispatch(action.setFilterCategory([]));
    dispatch(action.setFilterBrand([]));
    setPrice([0, 100000]);
    dispatch(action.setFilterPrice([0, 1000000]));
    setStock([0, 100000]);
    dispatch(action.setFilterStock([0, 1000000]));
    dispatch(action.setProductsSort(""));
    dispatch(action.setProductsSearch(""));
    dispatch(action.setProductsView("big"));
  };

  useEffect(() => {
    const categoryQuery = searchParams.get("categories");
    if (categoryQuery) {
      const list: string[] = categoryQuery.split("*");
      dispatch(action.setFilterCategory(list));
    }

    const brandQuery = searchParams.get("brands");
    if (brandQuery) {
      const list: string[] = brandQuery.split("*");
      dispatch(action.setFilterBrand(list));
    }

    const priceQuery = searchParams.get("price");
    if (priceQuery) {
      const list: string[] = priceQuery.split("*");
      const priceMinQuery = parseInt(list[0], 10) || 0;
      const priceMaxQuery = parseInt(list[1], 10) || 100000;
      setPrice([priceMinQuery, priceMaxQuery]);
      dispatch(action.setFilterPrice([priceMinQuery, priceMaxQuery]));
    }

    const stockQuery = searchParams.get("stock");
    if (stockQuery) {
      const list: string[] = stockQuery.split("*");
      const stockMinQuery = parseInt(list[0], 10) || 0;
      const stockMaxQuery = parseInt(list[1], 10) || 100000;
      setStock([stockMinQuery, stockMaxQuery]);
      dispatch(action.setFilterStock([stockMinQuery, stockMaxQuery]));
    }
  }, []);

  return (
    <aside className="filter">
      <div className="filter__panel">
        <button className="filter__panel-button" onClick={filterReset}>
          Filter Reset
        </button>
        <button
          className="filter__panel-button"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied("Copied!");
            setTimeout(() => setCopied("Copy Link"), 1000);
          }}
        >
          {copied}
        </button>
      </div>

      <div className="filter__container">
        <div className="filter__title">Categories</div>
        <div className="filter__scroll">
          {categoriesList.map(
            ({ label, countTotal, countFilter }, id: number) => {
              return (
                <p
                  className={`filter__item ${countFilter > 0 ? "active" : ""}`}
                  key={id}
                >
                  <input
                    type="checkbox"
                    name={label}
                    value={label}
                    checked={filterCategory.includes(label)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const checkbox = event.target as HTMLInputElement;
                      if (checkbox.value) {
                        if (checkbox.checked) {
                          const newFilter: string[] = [...filterCategory];
                          newFilter.push(checkbox.value);
                          dispatch(action.setFilterCategory(newFilter));
                          paramsHandler(
                            { categories: newFilter.join("*") },
                            searchParams,
                            setSearchParams
                          );
                        } else {
                          const newFilter = filterCategory.filter(
                            (item: string) => item !== checkbox.value
                          );
                          dispatch(action.setFilterCategory(newFilter));
                          paramsHandler(
                            { categories: newFilter.join("*") },
                            searchParams,
                            setSearchParams
                          );
                        }
                      }
                    }}
                  />
                  <span className="filter__label">{label}</span>
                  <span className="filter__count">
                    {countFilter}/{countTotal}
                  </span>
                </p>
              );
            }
          )}
        </div>
      </div>

      <div className="filter__container">
        <div className="filter__title">Brands</div>
        <div className="filter__scroll">
          {brandsList.map(({ label, countTotal, countFilter }, id: number) => {
            return (
              <p
                className={`filter__item ${countFilter > 0 ? "active" : ""}`}
                key={id}
              >
                <input
                  type="checkbox"
                  name={label}
                  value={label}
                  checked={filterBrand.includes(label)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const checkbox = event.target as HTMLInputElement;
                    if (checkbox.value) {
                      if (checkbox.checked) {
                        const newFilter: string[] = [...filterBrand];
                        newFilter.push(checkbox.value);
                        dispatch(action.setFilterBrand(newFilter));
                        paramsHandler(
                          { brands: newFilter.join("*") },
                          searchParams,
                          setSearchParams
                        );
                      } else {
                        const newFilter = filterBrand.filter(
                          (item: string) => item !== checkbox.value
                        );
                        dispatch(action.setFilterBrand(newFilter));
                        paramsHandler(
                          { brands: newFilter.join("*") },
                          searchParams,
                          setSearchParams
                        );
                      }
                    }
                  }}
                />
                <span className="filter__label">{label}</span>
                <span className="filter__count">
                  {countFilter}/{countTotal}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      <div className="filter__container">
        <div className="filter__title">Price</div>

        <div className="filter__range">
          <span>${Math.floor(price[0])}.00</span>
          <span>${Math.ceil(price[1])}.00</span>
        </div>

        <Range
          values={price}
          step={0.01}
          min={priceMin}
          max={priceMax}
          onChange={(values) => {
            setPrice(values);
          }}
          onFinalChange={(values) => {
            console.log(values);
            dispatch(action.setFilterPrice(values));
            paramsHandler(
              { price: values.join("*") },
              searchParams,
              setSearchParams
            );
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  backgroundColor: "grey",
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: "#CCC",
                }}
              />
            </div>
          )}
        />
      </div>

      <div className="filter__container">
        <div className="filter__title">Stock</div>

        <div className="filter__range">
          <span>{stock[0]}</span>
          <span>{stock[1]}</span>
        </div>

        <Range
          values={stock}
          step={1}
          min={stockMin}
          max={stockMax}
          onChange={(values) => setStock(values)}
          onFinalChange={(values) => {
            console.log(values);
            dispatch(action.setFilterStock(values));
            paramsHandler(
              { stock: values.join("*") },
              searchParams,
              setSearchParams
            );
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  backgroundColor: "grey",
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: "#CCC",
                }}
              />
            </div>
          )}
        />
      </div>
    </aside>
  );
};
