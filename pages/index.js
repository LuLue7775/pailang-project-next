import React from 'react'

import PageOneLeftCol from '../components/PageOneLeftCol';
import PageOneRightCol from '../components/PageOneRightCol';

import styled from "styled-components";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <StyledHome className='pOne-content-container' >
        <StyledHomeLeftCol 
            className='pOne-left-col' 
            as={motion.div}
            initial={{ x:"-100%", y:"200px" }}
            animate={{ x: 0, y: 0 }}
            transition={{
              type:"spring",
              stiffness: 360,
              damping: 100,
              duration: 3,
              ease: "easeInOut"
            }}
          > 
            <PageOneLeftCol/>
        </StyledHomeLeftCol>

          <StyledHomeRightCol 
            className='pOne-right-col' 
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 3,
              delay: .3,
              ease: "easeInOut",
              staggerChildren: 0.3,
            }}
            > 
              <PageOneRightCol/>
          </StyledHomeRightCol>
    </StyledHome>
  )
}




const StyledHome = styled.div`
  position: relative;
  display:grid;
  grid-template-columns:2fr 3fr;
  height: calc(100vh - 250px) ;

  font-family: 'Noto Serif TC', serif;
  font-weight: 200;
  letter-spacing: 1px;
`;

const StyledHomeLeftCol = styled(motion.div)`
  height: 100%;
  overflow-y:scroll;
  
  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */

  font-size: .9rem;
`;

const StyledHomeRightCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow-y:scroll;
  height: 100%;
  border-left: 1px #F8B724 dashed;


  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */

`;

