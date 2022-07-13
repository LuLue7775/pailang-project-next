import React, { useEffect, useRef } from 'react'
import styled from "styled-components";
import DOMPurify from 'isomorphic-dompurify';

export default function JournalLeftCol({ content, content_zh, comment, comment_zh }) {             
  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data)
  })
  

  return (
    <StyledLeftColContainer className="left-col-content">
        <StyledContentItems className='en' dangerouslySetInnerHTML={sanitizedData(content)}  />
        
        <StyledSeperate/>

        <StyledNote >
          <StyledContentSmItems dangerouslySetInnerHTML={sanitizedData(comment)}  />
        </StyledNote>

        <StyledContentItems dangerouslySetInnerHTML={sanitizedData(content_zh)}  />
        <StyledSeperate/>

        <StyledNote >
          <StyledContentSmItems dangerouslySetInnerHTML={sanitizedData(comment_zh)}  />
        </StyledNote>
    </StyledLeftColContainer>
  )
}

const StyledLeftColContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  letter-spacing: .1rem;
`;
const StyledContentItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 100px 0;
`;

const StyledSeperate = styled.div`
  margin: 100px 25px 0px 25px;
  border-bottom: 1px solid #85807f;
`;

const StyledNote = styled.div`
  margin: 100px 25px 200px 0;

`;
const StyledContentSmItems = styled.div`
  padding: 20px;
  margin: 0 50px 0 25px;
  font-size: .9rem;
  font-style: italic;
`;

const StyledBio = styled.div`
  font-weight: bold;
  font-style: normal;
  margin-bottom: 500px;

`;
