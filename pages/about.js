import React from 'react'
import AboutLeftElement from '../components/AboutLeftElement';
import AboutMidElement from '../components/AboutMidElement';
import AboutRightElement from '../components/AboutRightElement';
import { fetchData } from '../utils/functions';

import styled from "styled-components";
import { motion } from 'framer-motion'

import parse from 'html-react-parser';

export default function About({ data }) {
  const { content, content_zh, credits, roles } = data;
// console.log(data)
  return (
    <StyledAbout>
      <StyledAboutLeftCol>
        <AboutLeftElement roles={roles} parse={parse}/>
      </StyledAboutLeftCol>

      <StyledAboutMidCol>
        <StyledSideLines/>

        <AboutMidElement content={content} content_zh={content_zh} parse={parse}/>
      </StyledAboutMidCol>

      <StyledAboutRightCol>
        <AboutRightElement credits={credits} parse={parse}/>
      </StyledAboutRightCol>
    </StyledAbout>
  )
}

export async function getStaticProps() {  
  const data = await fetchData('/about').catch((e) => console.log(e))

  return {
    props: {
      data: data?.data || {}
    }, 
    revalidate: 60    
  }
}


const StyledAbout = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: absolute;
    top: 0;
    padding-top: 30px;
    width:100%;
    height:100vh;
    // height: calc(100vh - 50px);

    color: #000;

    overflow: hidden;

`;

const StyledAboutLeftCol = styled(motion.div)`
    height: 100%;
    // overflow-y:scroll;
    // overflow-x:hidden;

    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;

const StyledAboutMidCol = styled(motion.div)`
    height: 100%;
`;
const StyledSideLines = styled.div`
    position: absolute;

    width: calc(100vw/16*6*0.96);
    height: 300px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;

const StyledAboutRightCol = styled(motion.div)`
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;

    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;

