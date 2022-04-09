import React, { useState, useEffect } from "react";
import { Form } from "Form/Form";
import { Table } from "Table/Table";
import { AddCategory } from "AddCategory/AddCategory";
import { Wrapper } from "./App.styles";

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
      <Form categories={categories} items={items} setItems={setItems} />
      <Table categories={categories} items={items} setItems={setItems} />
      <AddCategory categories={categories} setCategories={setCategories} />
    </Wrapper>
  );
};

export default App;
