import React, { useState } from "react";
import { Table } from "Table/Table";
import { Wrapper, StyledForm } from "./Form.styles";

export const Form = () => {
  const [informations, setInformations] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const categories = [
    "Procesor",
    "Karta grafiki",
    "Pamięć RAM",
    "Peryferia",
    "Oprogramowanie",
  ];
  const [addCategoryFlag, setCategoryFlag] = useState(false);

  const handleInputValue = (element) => {
    setInformations({
      ...informations,
      [element.target.id]: element.target.value,
    });
  };
  const handleCategory = (element) => {
    setInformations({ ...informations, category: element.target.textContent });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const newItem = {
      id: Math.floor(Math.random() * 1000),
      name: informations.name,
      description: informations.description,
      price: informations.price,
      category: informations.category,
    };

    try {
      await fetch("http://localhost:3001/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
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
        <select id="category">
          <option disabled selected>
            Wybierz kategorię!
          </option>
          {categories.map((category) => (
            <option onClick={(event) => handleCategory(event)}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">submit</button>
      </StyledForm>

      <Table categories={categories} />

      <button onClick={() => setCategoryFlag(!addCategoryFlag)}>
        dodaj kategorię
      </button>
      {addCategoryFlag && <input placeholder="Dodaj kategorię" />}
    </Wrapper>
  );
};
