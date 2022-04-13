import React, { useState } from "react";
import { useContent } from "hooks/useContent";
import { Button } from "Button/Button";
import { Input } from "Input/Input";
import { Wrapper } from "./AddCategory.styles";

export const AddCategory = () => {
  const [category, setCategory] = useState({ category: "" });
  const [addCategoryFlag, setCategoryFlag] = useState(false);
  const { addCategory } = useContent();
  const handleCategoryValue = (event) =>
    setCategory({ category: event.target.value });
  const handleCategoryFlag = () => setCategoryFlag(!addCategoryFlag);

  return (
    <Wrapper>
      <Button onClick={handleCategoryFlag}>dodaj kategorię</Button>
      {addCategoryFlag && (
        <form onSubmit={(event) => addCategory("addCategory", category, event)}>
          <Input
            onChange={(event) => handleCategoryValue(event)}
            placeholder="Dodaj kategorię"
          />
          <Button type="submit">submit</Button>
        </form>
      )}
    </Wrapper>
  );
};
