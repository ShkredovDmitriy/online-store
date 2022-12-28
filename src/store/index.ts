import { ActionReducerMapBuilder, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const setFilterCategory = createAction<string[]>("setFilterCategory");
const filterCategory = createReducer(
  [],
  (builder: ActionReducerMapBuilder<string[]>) => {
    builder.addCase(setFilterCategory, (state, action) => action.payload);
  }
);

const setFilterBrand = createAction<string[]>("setFilterBrand");
const filterBrand = createReducer(
  [],
  (builder: ActionReducerMapBuilder<string[]>) => {
    builder.addCase(setFilterBrand, (state, action) => action.payload);
  }
);

const setFilterPrice = createAction<number[]>("setFilterPrice");
const filterPrice = createReducer(
  [0, 1000000],
  (builder: ActionReducerMapBuilder<number[]>) => {
    builder.addCase(setFilterPrice, (state, action) => action.payload);
  }
);

const setFilterStock = createAction<number[]>("setFilterStock");
const filterStock = createReducer(
  [0, 1000000],
  (builder: ActionReducerMapBuilder<number[]>) => {
    builder.addCase(setFilterStock, (state, action) => action.payload);
  }
);

const setProductsSort = createAction<string>("setProductsSort");
const productsSort = createReducer("default", (builder) => {
  builder.addCase(setProductsSort, (state, action) => action.payload);
});

const setProductsView = createAction<string>("setProductsView");
const productsView = createReducer("big", (builder) => {
  builder.addCase(setProductsView, (state, action) => action.payload);
});

const setProductsSearch = createAction<string>("setProductsSearch");
const productsSearch = createReducer("", (builder) => {
  builder.addCase(setProductsSearch, (state, action) => action.payload);
});

export const action = {
  setFilterCategory,
  setFilterBrand,
  setFilterPrice,
  setFilterStock,
  setProductsSort,
  setProductsView,
  setProductsSearch,
};

export const store = configureStore({
  reducer: {
    filterCategory,
    filterBrand,
    filterPrice,
    filterStock,
    productsSort,
    productsView,
    productsSearch,
  },
  devTools: true,
});

export { useDispatch, useSelector };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
