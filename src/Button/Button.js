import styled from "styled-components";
import { colors } from "theme/theme";

export const Button = styled.button`
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  background-color: ${colors.green};
  color: ${colors.grey};
  border: none;
  height: 50px;
  width: 120px;
  margin: 0 20px 0 0;
  cursor: pointer;

  &:hover {
    color: ${colors.white};
    transition: all 0.3s ease-in-out;
  }
`;
