import React, { useContext, useState } from "react";
import { ItemsCategoriesContext } from "App/App";
import { Input } from "Input/Input";
import { Label } from "Label/Label";
import { Select } from "Select/Select";
import { StyledButton, StyledForm } from "./Form.styles";
import { useContent } from "hooks/useContent";

export const Form = ({ method, id, index }) => {
  const { items, categories } = useContext(ItemsCategoriesContext);
  const { addItem, editItem } = useContent();
  const [informations, setInformations] = useState({
    id: method === "PATCH" ? items[index]?.id : "",
    name: method === "PATCH" ? items[index]?.name : "",
    description: method === "PATCH" ? items[index]?.description : "",
    price: method === "PATCH" ? items[index]?.price : "",
    category: method === "PATCH" ? items[index]?.category : "",
  });
  const selectState = method === "POST" ? "DEFAULT" : informations.category;
  const newItem = {
    id: method === "POST" ? `${Math.floor(Math.random() * 1000)}` : id,
    name: informations.name,
    description: informations.description,
    price: informations.price,
    category: informations.category,
  };
  const handleInputValue = (event) => {
    setInformations({
      ...informations,
      [event.target.id]: event.target.value,
    });
  };
  const handleOnSubmit = (event, index) =>
    method === "POST"
      ? addItem("addItem", newItem, event)
      : editItem("edit", newItem, event, index, id);

  return (
    <StyledForm onSubmit={(event) => handleOnSubmit(event, index)}>
      <Label htmlFor="name">Nazwa</Label>
      <Input
        placeholder="Nazwa produktu"
        id="name"
        value={informations.name}
        onChange={(event) => handleInputValue(event)}
      />
      <Label htmlFor="description">Opis</Label>
      <Input
        placeholder="Opis produktu, dokładna specyfikacja"
        id="description"
        value={informations.description}
        onChange={(event) => handleInputValue(event)}
      />
      <Label htmlFor="price">Cena</Label>
      <Input
        placeholder="Cena"
        id="price"
        type="number"
        value={informations.price}
        onChange={(event) => handleInputValue(event)}
      />
      <Label htmlFor="category">Wybierz kategorię</Label>
      <Select
        id="category"
        defaultValue={selectState}
        onChange={(event) => handleInputValue(event)}
      >
        <option disabled value={selectState}>
          {method === "POST" ? "Wybierz kategorię!" : informations.category}
        </option>
        {categories.map(({ category }, index) => (
          <option key={index}>{category}</option>
        ))}
      </Select>
      <StyledButton type="submit">
        {method === "POST" ? "dodaj nowy przedmiot" : "wprowadź modyfikacje"}
      </StyledButton>
    </StyledForm>
  );
};
