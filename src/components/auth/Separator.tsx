import styled from "styled-components";

const SSeparator = styled.div`
  //시계방향(12 3 6 9)
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  //width 100% -> padding 고려
  width: 100%;
  align-items: center;
  div {
    //100% 아니어도 상관 없음, flex-wrap 기본이 nowrap
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    //상하 좌우
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

function Separator() {
  return (
    <SSeparator>
      <div></div>
      <span>Or</span>
      <div></div>
    </SSeparator>
  );
}

export default Separator;
