import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonLink = styled(Link)`
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
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

  &:hover  {
    transform: translateY(-0.1rem);
    box-shadow: 0.2rem 0.2rem 0 cornflowerblue;
    border: 1px solid cornflowerblue;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  }

  &:visited{
    color: black;
  }
`

export default ButtonLink
