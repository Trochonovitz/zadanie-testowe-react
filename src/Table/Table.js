import React, { useState } from "react";

export const Table = ({ categories, items, setItems }) => {
  const [category, setCategory] = useState("wszystkie");
  const [editFlag, setEditFlag] = useState(false);
  const [informations, setInformations] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });
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
      setItems([...items.filter((item) => item.id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputValue = (event) => {
    setInformations({
      ...informations,
      [event.target.id]: event.target.value,
    });
  };

  const editItem = ({ id }) => {
    setEditFlag(!editFlag);
    setInformations({ ...informations, id });
  };

  const submitEditItem = async (event) => {
    event.preventDefault();
    const editedItem = {
      name: informations.name,
      description: informations.description,
      price: informations.price,
      category: informations.category,
    };

    try {
      await fetch(`http://localhost:3001/edit/${informations.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      });
      const updatedItemIndex = items.findIndex(
        (item) => item.id === informations.id
      );
      const updated1 = (items[updatedItemIndex] = {
        ...editItem,
        ...items[updatedItemIndex],
      });
      setItems([...items, updated1]);
      setEditFlag(!editFlag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>podsumowanie zamówienia</h2>
      {!items
        ? "Nic tu nie ma"
        : filteredArray.map(
            ({ name, description, price, category, id }, index) => (
              <div key={index}>
                {editFlag && informations.id === id ? (
                  <form onSubmit={(event) => submitEditItem(event)}>
                    <input
                      id="name"
                      placeholder="Nazwa"
                      value={informations.name}
                      onChange={(event) => handleInputValue(event)}
                    />
                    <input
                      id="description"
                      placeholder="Opis"
                      value={informations.description}
                      onChange={(event) => handleInputValue(event)}
                    />
                    <input
                      id="price"
                      placeholder="Cena"
                      value={informations.price}
                      onChange={(event) => handleInputValue(event)}
                    />
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
                    <button type="submit">wprowadź poprawki</button>
                  </form>
                ) : (
                  <>
                    <p>{name}</p>
                    <p>{description}</p>
                    <p>{price}</p>
                    <p>{category}</p>
                  </>
                )}
                <button onClick={() => deleteItem({ id })}>
                  delete record
                </button>
                <button onClick={(event) => editItem({ id }, event)}>
                  edit record
                </button>
              </div>
            )
          )}
      <h3>Koszt zamówienia: {summary}</h3>
      <h4>Ilość produktów w koszyku: {items.length}</h4>
      <button onClick={() => setCategory("wszystkie")}>wszystkie</button>
      {categories.map(({ category }, index) => (
        <button key={index} onClick={() => setCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};
