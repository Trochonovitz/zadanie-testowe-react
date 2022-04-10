import styled from "styled-components";
import { colors } from "theme/theme";

export const Input = styled.input`
  height: 50px;
  background-color: ${colors.grey};
  color: ${colors.white};
  border: 1px solid ${colors.green};
  margin: 0px;
  padding: 5px 20px;

  &::placeholder {
    color: ${colors.white};
  }
`;
