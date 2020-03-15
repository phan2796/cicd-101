import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #fff;
  min-height: 100vh;
  color: white;
  margin: 0px auto;
  text-align: center;
`;

export const SquareWrapper = styled.div`
  width: 710px;
  height: 710px;
  background-color: #fff;
  margin: 10px auto;
  padding: 10px;
  display: grid;
  grid-template-columns: ${props => (props ? `${props.template}` : "")};

  grid-gap: 5px;
`;

export const Square = styled.div`
  background-color: ${props => (props ? `${props.color}` : "#fff")};
  flex-basis: ${props => (props ? `${props.basis}%` : "1")};
  border-radius: 2px;
  // padding: 10px;
`;
