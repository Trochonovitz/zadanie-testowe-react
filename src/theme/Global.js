import { createGlobalStyle } from "styled-components";
import { colors } from "./theme";

export const Global = createGlobalStyle`
    body {
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
        background-color: ${colors.grey};
    }
    
    html, * {
        box-sizing: border-box;
        
    }
`;
