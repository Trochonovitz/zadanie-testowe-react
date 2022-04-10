import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ItemsCategoriesContext } from "App/App";
import { TableElement } from "TableElement/TableElement";

export const Table = () => {
  const [category, setCategory] = useState("wszystkie");
  const { items, categories, setItems } = useContext(ItemsCategoriesContext);
  const summary = items.reduce((acc, current) => acc + +current.price, 0);
  const filteredArray =
    category === "wszystkie"
      ? items
      : items.filter((element) => element.category === category);

  const reorderedItem = (array, startIndex, endIndex) => {
    const result = Array.from(array);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const reorganisedArray = reorderedItem(
      items,
      source.index,
      destination.index
    );
    try {
      await fetch("http://localhost:3001/reorganise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reorganisedArray),
      });
      setItems([...reorganisedArray]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>podsumowanie zamówienia</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredArray.map(
                ({ name, description, price, category, id }, index) => (
                  <Draggable
                    draggableId={`list-${index}`}
                    index={index}
                    key={index}
                  >
                    {(provided) => (
                      <TableElement
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        name={name}
                        description={description}
                        price={price}
                        category={category}
                        id={id}
                        index={index}
                      />
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
