import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonLink = styled(Link)`
  text-decoration: none;
  border: none;
  border-radius: 0.2rem;
  outline: none;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  cursor: pointer;
  color: black;
  user-select: none;
  background: rgba(0, 0, 0, 0.05);

  &:hover  {
    transform: translate(-0.1rem, -0.1rem);
    box-shadow: 0.2rem 0.2rem 0 cornflowerblue;
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  }

  &:visited{
    color: black;
  }
`

export default ButtonLink
