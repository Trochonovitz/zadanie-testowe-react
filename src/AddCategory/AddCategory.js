import React, { useContext, useState } from "react";
import { ItemsCategoriesContext } from "App/App";
import { Button } from "Button/Button";
import { Wrapper } from "./AddCategory.styles";
import { Input } from "Input/Input";

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
      await fetch("https://fast-beach-41104.herokuapp.com/addCategory", {
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
    <Wrapper>
      <Button onClick={() => setCategoryFlag(!addCategoryFlag)}>
        dodaj kategorię
      </Button>
      {addCategoryFlag && (
        <form onSubmit={(event) => handleOnSubmit(event)}>
          <Input
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Dodaj kategorię"
          />
          <Button type="submit">submit</Button>
        </form>
      )}
    </Wrapper>
  );
};
