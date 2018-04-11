import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: ${ ({ direction="column" }) => direction }
  ${({ direction="column"}) => direction === "row" ? "align-items: center" : "" }

  & > * {
    margin: 0;
  }

  & > * + * {
    ${ ({ direction="column" }) => `
      margin-top: ${ direction === "column" ? "2rem" : 0 };
      margin-left: ${ direction === "row" ? "2rem" : 0 };
    `}
  }
`

export default Flex
