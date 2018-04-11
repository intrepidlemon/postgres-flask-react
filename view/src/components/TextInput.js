import styled from 'styled-components'

const TextInput = styled.input`
  border: none;
  border-left: 2px solid rgba(0, 0, 0, 0.2);
  outline: none;
  font-size: 1.6rem;
  padding: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.05);

  &:focus {
    border-left: 5px solid cornflowerblue;
  }
`

export default TextInput
