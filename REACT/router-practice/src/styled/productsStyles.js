import styled from "styled-components"

export const ProductDescription = styled.div({
  color: "green",
  fontWeight: "bold"
});

export const ProductContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

export const ProductName = styled.div({
  fontWeight: "bold", 
  fontSize: "20px"
  
});


export const ProductPrice = styled.div`
  color: red;
  &:hover {
    color: green;
  }
`
