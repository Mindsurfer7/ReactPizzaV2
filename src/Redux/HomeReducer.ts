import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaBlockProps } from "../components/PizzaBlock";

type request = Record<string, string>;

type HomeReducer = {
  pizzas: PizzaBlockProps[];
  loadingStatus: "pending" | "success" | "error";
};

enum Status {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export const requestPizzas = createAsyncThunk(
  "home/requestPizzas",
  async (params: request) => {
    const { currentPage, category, sortBy, order, searchString } = params;
    const { data } = await axios.get(
      `https://64467ee4ee791e1e2900d793.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchString}`
    );
    console.log(data);
    return data as PizzaBlockProps[];
  }
);

const initialState: HomeReducer = {
  pizzas: [],
  loadingStatus: "pending",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    loadPizzas: (state, action: PayloadAction<PizzaBlockProps[]>) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.loadingStatus = "success";
    });
    builder.addCase(requestPizzas.rejected, (state, action) => {
      state.loadingStatus = "error";
      console.log("API error");
    });
    builder.addCase(requestPizzas.pending, (state, action) => {
      state.loadingStatus = "pending";
    });
  },
});

export const { loadPizzas } = homeSlice.actions;

export default homeSlice.reducer;
