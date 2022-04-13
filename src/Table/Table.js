import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useContent } from "hooks/useContent";
import { ItemsCategoriesContext } from "App/App";
import { TableElement } from "TableElement/TableElement";
import { Title } from "Title/Title";
import { CategoriesList } from "CategoriesList/CategoriesList";
import { Subtitle } from "Subtitle/Subtitle";
import {
  ButtonsWrapper,
  StyledButton,
  StyledTable,
  Wrapper,
} from "./Table.styles";

export const Table = () => {
  const [activeCategory, setActiveCategory] = useState("wszystkie");
  const { items, categories } = useContext(ItemsCategoriesContext);
  const { renderList } = useContent();
  const summary = items.reduce((acc, current) => acc + +current.price, 0);
  const filteredArray =
    activeCategory === "wszystkie"
      ? items
      : items.filter((element) => element.category === activeCategory);
  const setCategory = (value) => setActiveCategory(value);
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

    await renderList("reorganise", reorganisedArray);
  };
  return (
    <Wrapper>
      <Title>podsumowanie</Title>
      <CategoriesList />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <StyledTable {...provided.droppableProps} ref={provided.innerRef}>
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
            </StyledTable>
          )}
        </Droppable>
      </DragDropContext>
      <Subtitle>Koszt zamówienia: {summary} zł</Subtitle>
      <Subtitle>Ilość produktów w koszyku: {items.length}</Subtitle>
      <ButtonsWrapper>
        <StyledButton
          activeCategory={activeCategory}
          selectedCategory="wszystkie"
          onClick={() => setCategory("wszystkie")}
        >
          wszystkie
        </StyledButton>
        {categories.map(({ category }, index) => (
          <StyledButton
            activeCategory={activeCategory}
            selectedCategory={category}
            key={index}
            onClick={() => setCategory(category)}
          >
            {category}
          </StyledButton>
        ))}
      </ButtonsWrapper>
    </Wrapper>
  );
};
