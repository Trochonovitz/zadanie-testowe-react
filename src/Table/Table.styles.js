import styled, { css } from "styled-components";
import { Button } from "Button/Button";
import { colors } from "theme/theme";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
`;

export const StyledTable = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const StyledButton = styled(Button)`
  background-color: ${colors.grey};
  color: ${colors.green};
  border: 1px solid ${colors.green};

  ${({ activeCategory, selectedCategory }) =>
    activeCategory === selectedCategory &&
    css`
      background-color: ${colors.green};
      color: ${colors.grey};
    `}
`;
