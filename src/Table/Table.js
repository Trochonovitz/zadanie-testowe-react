import React, { useState, useEffect } from "react";

export const Table = ({ categories }) => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("wszystkie");

  const summary = items.reduce((acc, current) => acc + +current.price, 0);
  const filteredArray =
    category === "wszystkie"
      ? items
      : items.filter((element) => element.category === category);

  const deleteItem = async ({ id }) => {
    try {
      await fetch(`http://localhost:3001/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3001/items");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <h2>podsumowanie zamówienia</h2>
      {!items
        ? "Nic tu nie ma"
        : filteredArray.map(({ name, description, price, category, id }) => (
            <div>
              <p>{name}</p>
              <p>{description}</p>
              <p>{price}</p>
              <p>{category}</p>
              <p onClick={() => deleteItem({ id })}>X</p>
            </div>
          ))}
      <h3>Koszt zamówienia: {summary}</h3>
      <h4>Ilość produktów w koszyku: {items.length}</h4>
      <button onClick={() => setCategory("wszystkie")}>wszystkie</button>
      {categories.map((category) => (
        <button onClick={() => setCategory(category)}>{category}</button>
      ))}
    </div>
  );
};
