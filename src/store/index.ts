import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const setFilterCategory = createAction<any>("setFilterCategory");
const filterCategory = createReducer([], (builder) => {
  builder.addCase(setFilterCategory, (state, action) => action.payload);
});

const setFilterBrand = createAction<any>("setFilterBrand");
const filterBrand = createReducer([], (builder) => {
  builder.addCase(setFilterBrand, (state, action) => action.payload);
});

const setProductsSort = createAction<string>("setProductsSort");
const productsSort = createReducer("", (builder) => {
  builder.addCase(setProductsSort, (state, action) => action.payload);
});

export const action = {
  setFilterCategory,
  setFilterBrand,
  setProductsSort,
};

export const store = configureStore({
  reducer: {
    filterCategory,
    filterBrand,
    productsSort,
  },
  devTools: true,
});

export { useDispatch, useSelector };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
