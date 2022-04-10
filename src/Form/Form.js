import React, { useContext, useState } from "react";
import { ItemsCategoriesContext } from "App/App";
import { StyledForm } from "./Form.styles";

export const Form = ({
  method,
  url,
  id,
  index,
  editFlagStatus,
  setEditFlagStatus,
}) => {
  const { items, categories, setItems } = useContext(ItemsCategoriesContext);
  const informationsState = {
    id: method === "PATCH" ? items[index]?.id : "",
    name: method === "PATCH" ? items[index]?.name : "",
    description: method === "PATCH" ? items[index]?.description : "",
    price: method === "PATCH" ? items[index]?.price : "",
    category: method === "PATCH" ? items[index]?.category : "",
  };
  const [informations, setInformations] = useState(informationsState);
  const selectState = method === "POST" ? "DEFAULT" : informations.category;
  const handleInputValue = (event) => {
    setInformations({
      ...informations,
      [event.target.id]: event.target.value,
    });
  };

  const handleOnSubmit = async (event, index) => {
    event.preventDefault();
    const urlID =
      method === "POST" ? `${Math.floor(Math.random() * 1000)}` : id;
    const validURL = `http://localhost:3001/${url}/${
      method === "PATCH" ? id : ""
    }`;
    const newItem = {
      id: urlID,
      name: informations.name,
      description: informations.description,
      price: informations.price,
      category: informations.category,
    };

    try {
      await fetch(validURL, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (method === "PATCH") {
        let updatedArray = [...items];
        updatedArray[index] = newItem;
        setItems(updatedArray);
        setEditFlagStatus(!editFlagStatus);
      } else {
        setItems([newItem, ...items]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledForm onSubmit={(event) => handleOnSubmit(event, index)}>
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
        defaultValue={selectState}
        onChange={(event) => handleInputValue(event)}
      >
        <option disabled value={selectState}>
          {method === "POST" ? "Wybierz kategorię!" : informations.category}
        </option>
        {categories.map(({ category }, index) => (
          <option key={index}>{category}</option>
        ))}
      </select>
      <button type="submit">submit</button>
    </StyledForm>
  );
};
