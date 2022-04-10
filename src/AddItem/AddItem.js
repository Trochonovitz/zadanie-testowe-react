import React from "react";
import { Form } from "Form/Form";
import { Title } from "Title/Title";
import { Wrapper } from "./AddItem.styles";

export const AddItem = () => (
  <Wrapper>
    <Title>Dodaj produkt</Title>
    <Form url="addItem" method="POST" />
  </Wrapper>
);
