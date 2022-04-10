import React from "react";
import { Form } from "Form/Form";
import { Wrapper } from "./AddItem.styles";

export const AddItem = () => (
  <Wrapper>
    <h1>formularz</h1>
    <Form url="addItem" method="POST" />
  </Wrapper>
);
