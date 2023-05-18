import axios from "axios";
import React, { useEffect, useState } from "react";
import CSS from "../CSS/singlepizza.module.css";

import { Link, useLocation, useParams } from "react-router-dom";

interface Pizza {
  title: string;
  imageURL: string;
  price: number;
}

const SinglePizza: React.FC = (props) => {
  const { ID } = useParams();
  const [thePizza, setPizza] = useState<Pizza[]>([]);

  useEffect(() => {
    const API = async () => {
      const data = await axios.get(
        "https://64467ee4ee791e1e2900d793.mockapi.io/Pizzas"
      );

      const filteredPizza = data.data.filter((x) => x.id.toString() === ID);
      setPizza(filteredPizza);
    };
    API();
  }, []);

  if (!thePizza) {
    return <>loading...</>;
  }
  console.log(thePizza);
  return (
    <div className="container">
      <div className={CSS.content}>
        <div className={CSS.image}>
          <img src={thePizza[0].imageURL} alt="{title}" />
          <p className={CSS.text}>
            {thePizza[0].title}:{" "}
            <span className="price">{thePizza[0].price} Рублей</span>
          </p>
        </div>

        <div className={CSS.textBlock}>
          <div className={CSS.textBlockMini}>
            Pizza is a popular dish enjoyed by people all over the world. It is
            typically made with a base of dough, topped with a variety of
            ingredients such as tomato sauce, cheese, meat, vegetables, and
            herbs, and then baked in an oven. The composition of a pizza can
            vary widely depending on the type of dough, sauce, and toppings
            used. Studies have shown that the dough used to make pizza can have
            a significant impact on its overall quality. The type of flour used,
            the fermentation process, and the cooking temperature and time can
            all affect the texture and flavor of the crust.
          </div>
          <div className={CSS.textBlockMini}>
            For example, a longer fermentation period can result in a more
            flavorful crust due to the breakdown of complex carbohydrates into
            simpler sugars. The toppings used on a pizza can also contribute to
            its nutritional value. For instance, adding vegetables such as
            spinach, bell peppers, and mushrooms can increase the fiber and
            vitamin content of the dish. However, some toppings such as
            processed meats and extra cheese can add significant amounts of fat
            and sodium.
          </div>
          <div className={CSS.textBlockMini}>
            In addition to its nutritional composition, the sensory experience
            of eating pizza can also have psychological effects. Research has
            shown that the aroma of pizza can stimulate appetite and increase
            food intake, potentially leading to overconsumption. Furthermore,
            the social context in which pizza is consumed can also impact its
            perceived taste and enjoyment. Overall, pizza is a complex food that
            can have a variety of nutritional, sensory, and social effects.
            Further research is needed to fully understand the impact of
            different ingredients and preparation methods on the quality and
            healthfulness of this popular dish.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePizza;
