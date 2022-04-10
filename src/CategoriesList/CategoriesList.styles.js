import styled from "styled-components";
import { colors } from "theme/theme";

export const Wrapper = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const CategoryName = styled.li`
  text-decoration: none;
  color: ${colors.white};
  font-size: 1.2rem;
  letter-spacing: 0.2em;
`;
