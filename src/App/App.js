import React, { useState, useEffect, createContext } from "react";
import { Global } from "theme/Global";
import { AddItem } from "AddItem/AddItem";
import { Table } from "Table/Table";
import { AddCategory } from "AddCategory/AddCategory";
import { Wrapper } from "./App.styles";

export const ItemsCategoriesContext = createContext({
  items: [],
  catetegories: [],
  setItems: () => {},
  setCategories: () => {},
});

const App = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedItems = await fetch("http://localhost:3001/items");
        const dataItems = await fetchedItems.json();
        setItems(dataItems);

        const fetchedCategories = await fetch(
          "http://localhost:3001/categories"
        );
        const dataCategories = await fetchedCategories.json();
        setCategories(dataCategories);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <ItemsCategoriesContext.Provider
        value={{ items, categories, setItems, setCategories }}
      >
        <Global />
        <AddCategory />
        <AddItem />
        <Table />
      </ItemsCategoriesContext.Provider>
    </Wrapper>
  );
};

export default App;
