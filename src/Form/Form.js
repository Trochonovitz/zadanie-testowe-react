import React, { useState } from "react";
import { Wrapper, StyledForm } from "./Form.styles";

export const Form = ({ categories, items, setItems }) => {
  const [informations, setInformations] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const handleInputValue = (event) => {
    setInformations({
      ...informations,
      [event.target.id]: event.target.value,
    });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const newItem = {
      id: `${Math.floor(Math.random() * 1000)}`,
      name: informations.name,
      description: informations.description,
      price: informations.price,
      category: informations.category,
    };

    try {
      await fetch("http://localhost:3001/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      setItems([newItem, ...items]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <h1>formularz</h1>
      <StyledForm onSubmit={(event) => handleOnSubmit(event)}>
        <label htmlFor="name">Nazwa</label>
        <input
          placeholder="Nazwa produktu"
          id="name"
          value={informations.name}
          onChange={(event) => handleInputValue(event)}
        />
        <label htmlFor="description">Opis</label>
        <input
          placeholder="Opis produktu, dokładna specyfikacja"
          id="description"
          value={informations.description}
          onChange={(event) => handleInputValue(event)}
        />
        <label htmlFor="price">Cena</label>
        <input
          placeholder="Cena"
          id="price"
          value={informations.price}
          onChange={(event) => handleInputValue(event)}
        />
        <label htmlFor="category">Wybierz kategorię</label>
        <select
          id="category"
          defaultValue="DEFAULT"
          onChange={(event) => handleInputValue(event)}
        >
          <option disabled value="DEFAULT">
            Wybierz kategorię!
          </option>
          {categories.map(({ category }, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
        <button type="submit">submit</button>
      </StyledForm>
    </Wrapper>
  );
};
