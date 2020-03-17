import styled from "styled-components";

export const Wrapper = styled.div`
  p,
  h3 {
    margin: 0px;
    padding: 0px;
  }
  p.score {
    font-size: 50px;
    font-weight: 600;
    margin: 0 0 50px 0;
  }
  background-color: #fff;
  min-height: 100vh;
  color: #282c34;
  margin: 0px auto;
  text-align: center;
  display: flex;
  .left-content {
    flex-basis: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .right-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
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
  pointer-events: ${props => (props.isOver ? "none" : "")};
  opacity: ${props => (props.isOver ? "40%" : "100%")};
`;

export const Square = styled.div`
  background-color: ${props => (props.color ? `#${props.color}` : "#fff")};
  flex-basis: ${props => (props.basis ? `${props.basis}%` : "1")};
  border-radius: 5px;
  cursor: pointer;
`;

export const RankingHeader = styled.div`
  display: flex;
  width: 100%;
  p {
    font-weight: 600;
  }
  .no {
    flex-basis: 20px;
  }
  .number {
    flex-basis: 40px;
  }
  .name {
    flex-grow: 1;
  }
`;

export const RankingRecord = styled.div`
  display: flex;
  width: 100%;
  .no {
    flex-basis: 20px;
  }
  .number {
    flex-basis: 40px;
  }
  .name {
    flex-grow: 1;
  }
`;
