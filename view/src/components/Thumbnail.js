import styled from 'styled-components'

const Thumbnail = styled.img`
  max-width: ${({ size="10rem" }) => size };
  max-height: ${({ size="10rem" }) => size };
`

export default Thumbnail
