import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortItem } from "../components/tools/Sort";

type FilterReducer = {
  categoryID: number;
  currentPage: number;
  searchString: string;
  sort: SortItem;
};

const initialState: FilterReducer = {
  categoryID: 0,
  currentPage: 1,
  searchString: "",
  sort: { name: "популярности", type: "rating" },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortItem>) => {
      state.sort = action.payload;
    },
    setcategoryID: (state, action: PayloadAction<number>) => {
      state.categoryID = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      console.log("reduxx");
      state.searchString = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterReducer>) => {
      //@ts-ignore
      state.sort = action.payload;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryID = Number(action.payload.categoryID);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSort,
  setcategoryID,
  setCurrentPage,
  setSearchString,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
