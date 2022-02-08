import styled from "styled-components";

interface IButton {
  props?: object;
}

const Button = styled.input<IButton>`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

export default Button;
