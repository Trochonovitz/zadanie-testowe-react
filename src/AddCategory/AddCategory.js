import React, { useContext, useState } from "react";
import { ItemsCategoriesContext } from "App/App";

export const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [addCategoryFlag, setCategoryFlag] = useState(false);
  const { categories, setCategories } = useContext(ItemsCategoriesContext);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const newCategory = {
      category,
    };
    try {
      await fetch("http://localhost:3001/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      setCategories([newCategory, ...categories]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={() => setCategoryFlag(!addCategoryFlag)}>
        dodaj kategorię
      </button>
      {addCategoryFlag && (
        <form onSubmit={(event) => handleOnSubmit(event)}>
          <input
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Dodaj kategorię"
          />
          <button type="submit">submit</button>
        </form>
      )}
    </>
  );
};
