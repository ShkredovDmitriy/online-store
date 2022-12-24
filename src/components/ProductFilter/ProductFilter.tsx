import React from "react";
import "./productFilter.scss";
import { TProductItem } from "types";
import { productsList } from "data";
import { action, useSelector, RootState } from "store";
import { useDispatch } from "react-redux";

export const ProductFilter = () => {
  const dispatch = useDispatch();

  const filterCategory = useSelector(
    (state: RootState) => state.filterCategory
  ) as string[];

  const filterBrand = useSelector(
    (state: RootState) => state.filterBrand
  ) as string[];

  let available: TProductItem[] = [...productsList];

  if (filterCategory.length > 0)
    available = available.filter((productItem: TProductItem) =>
      filterCategory.includes(productItem.category)
    );

  if (filterBrand.length > 0)
    available = available.filter((productItem: TProductItem) =>
      filterBrand.includes(productItem.brand)
    );

  const categoriesList: {
    label: string;
    countTotal: number;
    countFilter: number;
  }[] = [];

  const brandsList: {
    label: string;
    countTotal: number;
    countFilter: number;
  }[] = [];

  productsList.forEach(({ id, category, brand }: TProductItem) => {
    const present =
      available.findIndex((availableProduct) => availableProduct.id === id) >
      -1;

    console.log("present", present);

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
  });

  const filterReset = () => {
    dispatch(action.setFilterCategory([]));
    dispatch(action.setFilterBrand([]));
  };

  return (
    <aside className="filter">
      <div className="filter__panel">
        <button onClick={filterReset}>Filter Reset</button>
        <button>Copy Link</button>
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
                    onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                      const checkbox = event.target as HTMLInputElement;
                      if (checkbox.value) {
                        if (checkbox.checked) {
                          const newFilter = [...filterCategory];
                          newFilter.push(checkbox.value);
                          dispatch(action.setFilterCategory(newFilter));
                        } else {
                          const newFilter = filterCategory.filter(
                            (item: string) => item !== checkbox.value
                          );
                          dispatch(action.setFilterCategory(newFilter));
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
                  onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                    const checkbox = event.target as HTMLInputElement;
                    if (checkbox.value) {
                      if (checkbox.checked) {
                        const newFilter = [...filterBrand];
                        newFilter.push(checkbox.value);
                        dispatch(action.setFilterBrand(newFilter));
                      } else {
                        const newFilter = filterBrand.filter(
                          (item: string) => item !== checkbox.value
                        );
                        dispatch(action.setFilterBrand(newFilter));
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
        <input type="range" />
      </div>

      <div className="filter__container">
        <div className="filter__title">Stock</div>
        <input type="range" />
      </div>
    </aside>
  );
};
