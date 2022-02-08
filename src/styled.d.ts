import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
    accentColor: string;
    accent?: string;
    borderColor?: string;
  }
}
