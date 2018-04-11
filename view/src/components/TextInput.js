import styled from 'styled-components'

const TextInput = styled.input`
  border: none;
  outline: none;
  font-size: 1.6rem;
  padding: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:focus {
    transform: translate(-0.1rem, -0.1rem);
    box-shadow: 0.3rem 0.3rem 0 cornflowerblue;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
  }
`

export default TextInput
