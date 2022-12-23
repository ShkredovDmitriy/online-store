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

  const categoriesList: string[] = [];
  const brandsList: string[] = [];

  productsList.forEach(({ category, brand }: TProductItem) => {
    if (categoriesList.indexOf(category) === -1) categoriesList.push(category);
    if (brandsList.indexOf(brand) === -1) brandsList.push(brand);
  });

  return (
    <aside className="filter">
      <div className="filter__container filter__container--categories">
        <div className="filter__title">Categories</div>
        {categoriesList.map((categoryItem: string, id: number) => {
          return (
            <p className="filter__item" key={id}>
              <input
                type="checkbox"
                name={categoryItem}
                value={categoryItem}
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
              {categoryItem}
            </p>
          );
        })}
      </div>

      <div className="filter__container filter__container--brands">
        <div className="filter__title">Brands</div>
        {brandsList.map((categoryItem: string, id: number) => {
          return (
            <p className="filter__item" key={id}>
              <input
                type="checkbox"
                name={categoryItem}
                value={categoryItem}
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
              {categoryItem}
            </p>
          );
        })}
      </div>
    </aside>
  );
};
