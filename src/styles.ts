import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  bgColor: "white",
  accentColor: "gray",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
  accentColor: "blue",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    //input의 모든 property 삭제
    input{
      all:unset;
    }
    *{
      box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:"Open Sans",sans-serif;
        color:rgb(38,38,38);
    }
    a{
      text-decoration:none;
    }
`;
