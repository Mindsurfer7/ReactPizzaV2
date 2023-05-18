import React from "react";
//@ts-ignore
import Category from "../tools/Category.tsx";
//@ts-ignore
import Sort, { sorts } from "../tools/Sort.tsx";
//@ts-ignore
import PizzaBlock from "../PizzaBlock.tsx";
import { useEffect, useState } from "react";
import PizzaLoader from "../../assets/pizzaPreloader.jsx";
//@ts-ignore
import Paginator from "../tools/Paginator.tsx";
import { useDispatch, useSelector } from "react-redux";

import {
  setcategoryID,
  setSort,
  setFilters,
  setCurrentPage,
  //@ts-ignore
} from "../../Redux/FilterSlice.ts";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { loadPizzas, requestPizzas } from "../../Redux/HomeReducer.ts";
//@ts-ignore
import { RootState, useMyDispatch } from "../../Redux/ReduxStrore.ts";
import qs from "qs";

const Home = (props) => {
  const dispatch = useMyDispatch();
  const navigate = useNavigate();
  const { pizzas, loadingStatus } = useSelector(
    (state: RootState) => state.home
  );
  //const [isLoading, setLoading] = useState(false);
  const { categoryID, sort, currentPage, searchString } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    const order = sort.type.includes("-") ? "asc" : "desc";
    const sortBy = sort.type.replace("-", "");
    const category = categoryID > 0 ? `category=${categoryID}` : "";

    dispatch(
      requestPizzas({
        currentPage: String(currentPage),
        category: category,
        sortBy: sortBy,
        order: order,
        searchString: searchString,
      })
    );
  }, [categoryID, sort, searchString, currentPage]);

  const setcategory = React.useCallback(
    (id: number) => dispatch(setcategoryID(id)),
    []
  );

  return (
    <div className="content">
      <div className="container">
        <div className="categories">
          <Category categoryID={categoryID} setcategoryID={setcategory} />
        </div>

        <Sort sortName={sort.name} selectSort={(i) => dispatch(setSort(i))} />

        <h2 className="content__title">Все пиццы</h2>

        <div className="content__items">
          {loadingStatus === "pending"
            ? [...new Array(6)].map((_, i) => <PizzaLoader key={i} />)
            : pizzas.map((pizzaData) => {
                return <PizzaBlock key={pizzaData.id} {...pizzaData} />;
              })}
        </div>
        <Paginator
          currentPage={currentPage}
          setPage={(e) => dispatch(setCurrentPage(e))}
        />
      </div>
    </div>
  );
};

export default Home;

// useEffect(() => {
//   if (window.location.search) {
//     const params = qs.parse(window.location.search.substring(1));
//     const newSort = sorts.find((x) => x.type === params.sortProperty);
//     dispatch(setFilters({ ...params, newSort }));
//   }
// });

// useEffect(() => {
//   const queryString = qs.stringify({
//     sortProperty: sort.type,
//     categoryID,
//     currentPage,
//   });
//   navigate(`?${queryString}`);
//   console.log(queryString);
// }, [categoryID, sort, currentPage]);
