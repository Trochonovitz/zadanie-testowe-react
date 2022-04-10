import React, { useContext, useState, forwardRef } from "react";
import { ItemsCategoriesContext } from "App/App";
import { Form } from "Form/Form";
import { Entry } from "Entry/Entry";
import { Button } from "Button/Button";

export const TableElement = forwardRef(
  ({ name, description, price, category, id, index, ...props }, ref) => {
    const [editFlag, setEditFlag] = useState({ status: false, id: "" });
    const { items, setItems } = useContext(ItemsCategoriesContext);
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
      <div ref={ref} {...props}>
        {editFlag.status && editFlag.id === id ? (
          <Form
            url="edit"
            method="PATCH"
            editFlagStatus={editFlag.status}
            setEditFlagStatus={setEditFlag}
            id={id}
            index={index}
          />
        ) : (
          <Entry
            name={name}
            description={description}
            price={price}
            category={category}
          />
        )}
        <Button onClick={() => deleteItem({ id })}>usuń</Button>
        <Button onClick={() => editItem({ id })}>edytuj</Button>
      </div>
    );
  }
);
