import { useState } from "react";
import React from "react";

type CategoryProps = {
  categoryID: number;
  setcategoryID: (id: number) => void;
};

const Category: React.FC<CategoryProps> = (props) => {
  console.log("rerender");
  const cats = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <>
      <ul>
        {cats.map((name, index) => {
          return (
            <li
              key={index}
              onClick={() => props.setcategoryID(index)}
              className={props.categoryID === index ? "active" : ""}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Category;
