
import { styled } from 'styled-components'

export default function StyledPage(){

  const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => props.backgroundColor};
    &:hover {
      color: ${props => props.hoverFontColor ?? "green"};
      border: 10px solid purple
    }
    p {
      color: white
    }
  `

  const H1_SPECIAL = styled.h1`
    font-family: 'Arial';
    font-weight: lighter;
  `

  const H2_SPECIAL = styled(H1_SPECIAL)`
    font-size: 46px;
    font-weight: bold;
  `

  return (
    <>
      <Container backgroundColor="yellow" hoverFontColor="blue">
        <H1_SPECIAL>Sopas</H1_SPECIAL>
        <p>Sopas muito boas</p>
      </Container>
      <Container backgroundColor="orange">
        <H2_SPECIAL>Cenouras</H2_SPECIAL>
        <p>Cenouras que nao prestam</p>
      </Container>
    </>
  )

}