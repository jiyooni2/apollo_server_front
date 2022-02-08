import styled from "styled-components";

interface IFormError {
  message?: string;
}

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 5px 0px;
`;

function FormError({ message }: IFormError) {
  return message === undefined ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
