import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: ${ ({ direction="column" }) => direction }

  & > * {
    margin: 0;
  }

  & > * + * {
    ${ ({ direction="column" }) => `
      margin-top: ${ direction === "column" ? "1rem" : 0 };
      margin-left: ${ direction === "row" ? "1rem" : 0 };
    `}
  }
`

export default Flex
