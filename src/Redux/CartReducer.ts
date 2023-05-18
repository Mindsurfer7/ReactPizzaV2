import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStrore";

export type SinglePizza = {
  id: number;
  title: string;
  price: number;
  count: number;
  type: number;
  size: number;
  imageURL: string;
};
export type notFullPizza = {
  id: number;
  type: number;
  size: number;
};
interface CartReducer {
  totalPrice: number;
  pizzas: SinglePizza[];
}

const initialState: CartReducer = {
  totalPrice: 0,
  pizzas: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPizza: (state, action: PayloadAction<SinglePizza>) => {
      const replica = state.pizzas.find((x) => {
        return (
          x.id === action.payload.id &&
          x.size === action.payload.size &&
          x.type === action.payload.type
        );
      });
      if (replica) {
        replica.count++;
      } else {
        state.pizzas.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.pizzas.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    cutPizza: (state, action: PayloadAction<notFullPizza>) => {
      state.pizzas = state.pizzas.filter(
        (x) =>
          x.id !== action.payload.id ||
          x.size !== action.payload.size ||
          x.type !== action.payload.type
      );
      state.totalPrice = state.pizzas.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    decreasePizza: (state, action: PayloadAction<notFullPizza>) => {
      const foundPizza = state.pizzas.find(
        (x) =>
          x.id === action.payload.id &&
          x.size === action.payload.size &&
          x.type === action.payload.type
      );
      if (foundPizza) {
        foundPizza.count--;
      }
      state.totalPrice = state.pizzas.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearAll: (state) => {
      state.pizzas = [];
      state.totalPrice = 0;
    },
  },
});

export const { setPizza, cutPizza, decreasePizza, clearAll } =
  cartSlice.actions;

export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;

// decreasePizza: (state, action) => {
//   const foundPizza = state.pizzas.filter(
//     (x) =>
//       x.id === action.payload.id &&
//       x.size === action.payload.size &&
//       x.type === action.payload.type
//   );
//   if (foundPizza) {
//     foundPizza.count--;
//   }
// },
