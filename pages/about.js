import React from 'react'
import AboutLeftElement from '../components/AboutLeftElement';
import AboutMidElement from '../components/AboutMidElement';
import AboutRightElement from '../components/AboutRightElement';

import styled from "styled-components";
import { motion } from 'framer-motion'

import parse from 'html-react-parser';

export default function About({ data }) {
  const { content, content_zh, credits, roles } = data?.data

  return (
    <StyledAbout>
      <StyledAboutLeftCol
        as={motion.div}
        initial={{ y:"100%" }}
        animate={{ y: 0 }}
        transition={{
          type:"spring",
          stiffness: 400,
          damping: 100,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        <AboutLeftElement roles={roles} parse={parse}/>
      </StyledAboutLeftCol>

      <StyledAboutMidCol
        as={motion.div}
        initial={{ y:"-100%" }}
        animate={{ y: 0 }}
        transition={{
          type:"spring",
          stiffness: 400,
          damping: 100,
          duration: 3,
          ease: "easeInOut"
        }}>
        <StyledSideLines/>

        <AboutMidElement content={content} content_zh={content_zh} parse={parse}/>
      </StyledAboutMidCol>

      <StyledAboutRightCol
        as={motion.div}
        initial={{ y:"100%" }}
        animate={{ y: 0 }}
        transition={{
          type:"spring",
          stiffness: 400,
          damping: 100,
          duration: 3,
          ease: "easeInOut"
        }}>
        <AboutRightElement credits={credits} parse={parse}/>
      </StyledAboutRightCol>
    </StyledAbout>
  )
}

export async function getStaticProps() {
  const DIRECTUS_API = process.env.DIRECTUS
  
  const fetchData = async( route ) => {
      const res = await fetch(`${ DIRECTUS_API + route }`, {
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' }
      })
      const resJson = await res.json()
      
      if ( resJson.errors ) throw resJson.errors
      return resJson
  }

  const data = await fetchData('/about').catch((e) => console.log(e))

  return {
    props: {
      data,
    }, 
    revalidate: 60    
  }
}


const StyledAbout = styled.div`
    display:grid;
    grid-template-columns: 5fr 6fr 5fr;
    position: relative;
    width:100vw;
    height: calc(100vh - 50px);
    color: #000;
    background: rgb(207,204,204);
    background: radial-gradient(circle, rgba(207,204,204,1) 29%, rgba(255,255,255,1) 93%);
    overflow-y:scroll;
    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

    font-family: 'Noto Serif TC', serif;
    font-weight: 200;
    letter-spacing: 1px;
`;

const StyledAboutLeftCol = styled(motion.div)`
    border-right: 1px #F8B724 dashed;
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;

    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;

const StyledAboutMidCol = styled(motion.div)`
    border-right: 1px #F8B724 dashed;
    height: 100%;
`;
const StyledSideLines = styled.div`
    position: absolute;
    border-left: 1px #F8B724 solid;
    border-right: 1px #F8B724 solid;
    width: calc(100vw/16*6*0.96);
    height: 300px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;

const StyledAboutRightCol = styled(motion.div)`
    border-right: 1px #F8B724 dashed;
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;

    ::-webkit-scrollbar { width: 0; }
    scrollbar-width: none; /* Firefox */

`;

