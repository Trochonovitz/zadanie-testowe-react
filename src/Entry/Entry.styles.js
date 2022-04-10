import styled from "styled-components";
import { colors } from "theme/theme";

export const Wrapper = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: ${colors.grey};
`;

export const Paragraph = styled.p`
  color: white;
  border: 1px solid ${colors.green};
  padding: 10px 20px;
`;
