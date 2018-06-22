import styled from 'styled-components'

const Button = styled.button`
  border-radius: 0.2rem;
  outline: none;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
  background: rgba(0, 0, 0, 0.05);
  border: none;

  &:hover  {
    transform: translate(-0.1rem, -0.1rem);
    box-shadow: 0.2rem 0.2rem 0 cornflowerblue;
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  }
`

export default Button
