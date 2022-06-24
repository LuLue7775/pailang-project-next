import React, { useState, useRef, useEffect, useLayoutEffect  } from 'react'
import useMediaQuery from '../../utils/hooks';
import VideoPlayer from '../../components/VideoPlayer';

import styled from "styled-components";
import { motion } from 'framer-motion'

import parse from 'html-react-parser';

export default function Video({ data, query }) {
  console.log(data)

  const isMobile = useMediaQuery('(max-width: 768px)');

  const videoPlayerRef = useRef(null);

  return (
        <>
      <StyledVideo isMobile={isMobile}>
        <StyledLeftCol 
          className='left-col' 
          isMobile={isMobile} 
          as={motion.div}
          initial={{ x:"-100%", y:"200px" }}
          animate={{ x: 0, y: 0 }}
          exit={{ y:"200px" }}
          transition={{
            type:"spring",
            stiffness: 360,
            damping: 100,
            duration: 3,
            ease: "easeInOut"
          }}
          >
          <StyledVideoContainer > 
            {/* <VideoPlayer ref={videoPlayerRef} leftCol={leftCol}/> */}
          </StyledVideoContainer>
          <StyledLeftText className='left-text'>
          { parse(data?.description) }
          </StyledLeftText>
        </StyledLeftCol>
        <StyledRightCol 
          className='right-col'
          as={motion.div}
          initial={{ x:"100%", y:"200px" }}
          animate={{ x: 0, y: 0 }}
          exit={{  y:"200px" }}
          transition={{
            type:"spring",
            stiffness: 360,
            damping: 100,
            duration: 3,
            ease: "easeInOut"
          }}
          >
          { parse(data?.content) }
        </StyledRightCol>
      </StyledVideo>
    </>
  )
}

export async function getStaticProps({ params }) {
    const id = params.id;

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

    const data = await fetchData(`/article-video/${id}`).catch(err => console.error(err) ) 
    return {
      props: { 
          data: data?.data || {},
      },
    };
  }

export async function getStaticPaths() {


    // const id = dataJson.pages.first;
    // console.log(id)
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }, 
            { params: { id: '3' } } 
          ],
        fallback: true
    };
  }

  
const StyledVideo = styled.div`
display: ${({ isMobile }) => isMobile ? "flex" : "grid"};
flex-direction: column;
grid-template-columns: 4fr 2fr;
position: absolute;
top: 250px;

width:100vw;
height: calc(100vh - 250px);

overflow-y:scroll;
::-webkit-scrollbar { width: 0; }
scrollbar-width: none; /* Firefox */

font-family: 'Noto Serif TC', serif;
font-weight: 200;
letter-spacing: 1px;
`;

const StyledLeftCol = styled(motion.div)`
position: relative;
height: auto;
border-right:  ${({ isMobile }) => isMobile ? "" : "1px #F8B724 dashed"} ;
padding: 20px;
font-size: .5px;
color: #FFF;

`;
const StyledLeftText = styled.div`
position: relative;
height: auto;
padding: 20px;
`;
const StyledRightCol = styled(motion.div)`
height: 100%;
font-size: .5px;
color: #FFF;
padding: 20px;
`;


const StyledVideoContainer = styled.div`
height: 450px;
width: 100%;
border-radius: 10px;
background-color: #0000005F;
border: 1px solid #F8B724;

`;

