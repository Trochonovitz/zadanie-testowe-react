import React, { useContext, useState } from "react";
import { ItemsCategoriesContext } from "App/App";
import { TableElement } from "TableElement/TableElement";

export const Table = () => {
  const [category, setCategory] = useState("wszystkie");
  const { items, categories } = useContext(ItemsCategoriesContext);
  const summary = items.reduce((acc, current) => acc + +current.price, 0);
  const filteredArray =
    category === "wszystkie"
      ? items
      : items.filter((element) => element.category === category);

  return (
    <div>
      <h2>podsumowanie zamówienia</h2>
      {!items
        ? "Nic tu nie ma"
        : filteredArray.map(
            ({ name, description, price, category, id }, index) => (
              <TableElement
                key={index}
                name={name}
                description={description}
                price={price}
                category={category}
                id={id}
                index={index}
              />
            )
          )}
      <h3>Koszt zamówienia: {summary}</h3>
      <h4>Ilość produktów w koszyku: {items.length}</h4>
      <button onClick={() => setCategory("wszystkie")}>wszystkie</button>
      {categories.map(({ category }, index) => (
        <button key={index} onClick={() => setCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};
