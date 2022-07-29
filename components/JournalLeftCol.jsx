import styled from 'styled-components'
import { createMarkup } from '../utils/functions';

export default function JournalLeftCol({ content, content_zh, comment, comment_zh }) {


  return (
    <StyledLeftColContainer className="left-col-content">
      <StyledContentItems className="en" dangerouslySetInnerHTML={ content && createMarkup(content)} /> 
      <StyledSeperate />

      <StyledNote>
        <StyledContentSmItems  dangerouslySetInnerHTML={ comment && createMarkup(comment)}/>
      </StyledNote>

      <StyledContentItems dangerouslySetInnerHTML={ content_zh && createMarkup(content_zh)}/>
      <StyledSeperate />

      <StyledNote>
        <StyledContentSmItems dangerouslySetInnerHTML={ comment_zh && createMarkup(comment_zh)} /> 
      </StyledNote>
    </StyledLeftColContainer>
  )
}

const StyledLeftColContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  letter-spacing: 0.1rem;
`
const StyledContentItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 100px 0;
`

const StyledSeperate = styled.div`
  margin: 100px 25px 0px 25px;
  border-bottom: 1px solid #85807f;
`

const StyledNote = styled.div`
  margin: 100px 25px 200px 0;
`
const StyledContentSmItems = styled.div`
  padding: 20px;
  margin: 0 50px 0 25px;
  font-size: 0.8rem;
`

const StyledBio = styled.div`
  font-weight: bold;
  font-style: normal;
  margin-bottom: 500px;
`
