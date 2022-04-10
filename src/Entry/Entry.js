import React from "react";
import { Paragraph, Wrapper } from "./Entry.styles";

export const Entry = ({ name, description, price, category }) => (
  <Wrapper>
    <Paragraph>{name}</Paragraph>
    <Paragraph>{description}</Paragraph>
    <Paragraph>{price} zł</Paragraph>
    <Paragraph>{category}</Paragraph>
  </Wrapper>
);
