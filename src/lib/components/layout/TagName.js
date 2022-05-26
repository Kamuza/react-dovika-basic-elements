import styled from 'styled-components'

const TagName = styled.span`
  padding: 2px 4px;
  border: 1px solid ${(props) => props.tag};
  border-radius: 2px;
  color: ${(props) => props.tag};
  background-color: ${(props) => props.bgColor};
`

export default TagName
