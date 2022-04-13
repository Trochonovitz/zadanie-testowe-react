import React, { useState, forwardRef, createContext } from "react";
import { Form } from "Form/Form";
import { Entry } from "Entry/Entry";
import { Button } from "Button/Button";
import { useContent } from "hooks/useContent";

export const EditUtilsContext = createContext({
  editFlagStatus: false,
  setEditFlagStatus: () => {},
});

export const TableElement = forwardRef(
  ({ name, description, price, category, id, index, ...props }, ref) => {
    const [editFlag, setEditFlag] = useState({ status: false, id: "" });
    const { deleteItem } = useContent();
    const editItem = ({ id }) => {
      setEditFlag({ status: !editFlag.status, id });
    };

    return (
      <EditUtilsContext.Provider
        value={{
          editFlagStatus: editFlag.status,
          setEditFlagStatus: setEditFlag,
        }}
      >
        <div ref={ref} {...props}>
          {editFlag.status && editFlag.id === id ? (
            <Form url="edit" method="PATCH" id={id} index={index} />
          ) : (
            <Entry
              name={name}
              description={description}
              price={price}
              category={category}
            />
          )}
          <Button onClick={async () => deleteItem("delete", { id })}>
            usuń
          </Button>
          <Button onClick={() => editItem({ id })}>edytuj</Button>
        </div>
      </EditUtilsContext.Provider>
    );
  }
);
