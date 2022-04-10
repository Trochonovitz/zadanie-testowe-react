import React, { useContext, useState } from "react";
import { ItemsCategoriesContext } from "App/App";
import { Form } from "Form/Form";

export const TableElement = ({
  name,
  description,
  price,
  category,
  id,
  index,
}) => {
  const [editFlag, setEditFlag] = useState({ status: false, id: "" });
  const { items, categories, setItems } = useContext(ItemsCategoriesContext);
  const editItem = ({ id }) => {
    setEditFlag({ status: !editFlag.status, id });
  };

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

  return (
    <div>
      {editFlag.status && editFlag.id === id ? (
        <Form
          url="edit"
          method="PATCH"
          editFlagStatus={editFlag.status}
          setEditFlagStatus={setEditFlag}
          id={id}
          items={items}
          setItems={setItems}
          categories={categories}
          index={index}
        />
      ) : (
        <>
          <p>{name}</p>
          <p>{description}</p>
          <p>{price}</p>
          <p>{category}</p>
        </>
      )}
      <button onClick={() => deleteItem({ id })}>delete record</button>
      <button onClick={() => editItem({ id })}>edit record</button>
    </div>
  );
};
