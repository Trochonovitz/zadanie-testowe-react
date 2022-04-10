import React from "react";

export const Entry = ({ name, description, price, category }) => (
  <>
    <p>{name}</p>
    <p>{description}</p>
    <p>{price}</p>
    <p>{category}</p>
  </>
);
