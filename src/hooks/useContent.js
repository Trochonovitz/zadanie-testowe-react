import { useContext } from "react";
import { ItemsCategoriesContext } from "App/App";
import { EditUtilsContext } from "TableElement/TableElement";

export const useContent = () => {
  const { items, setItems, categories, setCategories } = useContext(
    ItemsCategoriesContext
  );
  const { editFlagStatus, setEditFlagStatus } = useContext(EditUtilsContext);
  const BASIC_URL = "https://fast-beach-41104.herokuapp.com";

  const addItem = async (url, newItem, event) => {
    event.preventDefault();
    try {
      await fetch(`${BASIC_URL}/${url}`, {
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

  const editItem = async (url, editedItem, event, index, id) => {
    event.preventDefault();
    try {
      await fetch(`${BASIC_URL}/${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      });
      let updatedArray = [...items];
      updatedArray[index] = editedItem;
      setItems(updatedArray);
      setEditFlagStatus(!editFlagStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (url, { id }) => {
    try {
      await fetch(`${BASIC_URL}/${url}/${id}`, {
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

  const addCategory = async (url, newCategory, event) => {
    event.preventDefault();
    try {
      await fetch(`${BASIC_URL}/${url}`, {
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

  const renderList = async (url, newArray) => {
    try {
      await fetch(`${BASIC_URL}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArray),
      });
      setItems([...newArray]);
    } catch (error) {
      console.log(error);
    }
  };

  return { addItem, editItem, deleteItem, renderList, addCategory };
};
