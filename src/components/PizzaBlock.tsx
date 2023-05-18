import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { setPizza } from "../Redux/CartReducer.ts";
import { RootState } from "../Redux/ReduxStrore.js";

export type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  imageURL: string;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageURL,
  ...props
}) => {
  const typeNames = ["тонкое", "традиционное"];
  const dispatch = useDispatch();
  const [activePastry, setActivePastry] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const quantity = useSelector((state: RootState) => {
    const similarPizzas = state.cart.pizzas.filter(
      (pizza) =>
        pizza.title === title &&
        pizza.price === price &&
        pizza.imageURL === imageURL
    );
    const totalQuantity = similarPizzas.reduce(
      (sum, pizza) => sum + pizza.count,
      0
    );
    return totalQuantity;
  });

  const pushPizza = () => {
    const aPizza = {
      id,
      title,
      price,
      imageURL,
      type: activePastry,
      size: activeSize,
      count: 0,
    };
    dispatch(setPizza(aPizza));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageURL} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {props.types.map((x) => {
            return (
              <li
                key={x}
                className={activePastry === x ? "active" : ""}
                onClick={() => setActivePastry(x)}
              >
                {typeNames[x]}
              </li>
            );
          })}
        </ul>
        <ul>
          {props.sizes.map((x, i) => {
            return (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {x} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">От {price}₽</div>
        <div onClick={pushPizza} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {quantity > 0 && <i>{quantity}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
