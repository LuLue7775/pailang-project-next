import React, { useEffect, useRef } from 'react'
import styled from "styled-components";

import dataJson from '../dataset.json';

export default function JournalLeftCol() {
    const { enContent, enNote, enBio, chContent, chNote, chBio } = dataJson?.homePage?.leftCol;
    /**
     * @TODO AFTER pulling data from directus, add classname for en/zh
     * All async request will be using react-query
     */

  return (
    <StyledLeftColContainer className="left-col-content">
        { enContent?.map( (item, i) => (
            <StyledContentItems className="en-item" key={i}> {item} </StyledContentItems>
        )) }
        
        <StyledSeperate/>

        <StyledNote className="en-note">
          { enNote?.map( (item, i) => (
              <StyledContentSmItems key={i}>
                <StyledNoteIndex> [{i}] </StyledNoteIndex>
                <div> {item} </div>
              </StyledContentSmItems>
          )) }
        </StyledNote>

        <StyledBio className="en-bio">
            { enBio?.map( (item, i) => (
              <StyledContentSmItems key={i}> 
                <div> Bio </div>
                {item} 
              </StyledContentSmItems>
          )) }
        </StyledBio>

        { chContent?.map( (item, i) => (
            <StyledContentItems className="ch-item" key={i}> {item} </StyledContentItems>
        )) }
        
        <StyledSeperate/>

        <StyledNote className="ch-note">
          { chNote?.map( (item, i) => (
              <StyledContentSmItems key={i}>
                <StyledNoteIndex> [{i}] </StyledNoteIndex>
                <div> {item} </div>
              </StyledContentSmItems>
          )) }
        </StyledNote>

        <StyledBio className="ch-bio">
            { chBio?.map( (item, i) => (
              <StyledContentSmItems key={i} > 
                <div> Bio </div>
                {item} 
              </StyledContentSmItems>
          )) }
        </StyledBio>


    </StyledLeftColContainer>
  )
}

const StyledLeftColContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;

`;
const StyledContentItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const StyledSeperate = styled.div`
  margin: 100px 25px 50px 25px;
  border-bottom: 1px solid #85807f;
`;

const StyledNoteIndex = styled.p`
  color: #F4D863;
  font-weight: lighter;
  font-size: .2rem;
`;

const StyledNote = styled.div`
  margin: 100px 25px 50px 0;

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
