import { configureStore } from "@reduxjs/toolkit";
//@ts-ignore
import filterSlice from "./FilterSlice.ts";
//@ts-ignore
import CartReducer from "./CartReducer.ts";
//@ts-ignore
import homeSlice from "./HomeReducer.ts";
import { useDispatch } from "react-redux";

export type RootState = ReturnType<typeof PizzaStore.getState>;

export type MyDispatch = typeof PizzaStore.dispatch;

export const useMyDispatch = () => useDispatch<MyDispatch>();

export const PizzaStore = configureStore({
  reducer: { filter: filterSlice, cart: CartReducer, home: homeSlice },
});
