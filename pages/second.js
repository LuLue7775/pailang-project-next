import React, { useRef }  from 'react'
import styled from "styled-components";
import BoxesView from '../components/BoxesView';
import { motion } from "framer-motion";

export default function Second() {
  const canvasRef = useRef(null);
  
  return (
    <StyledPageTwo 
      ref={canvasRef} 
      className="page-two" 
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
      <BoxesView canvasRef={canvasRef}/>
    </StyledPageTwo>
  )
}


const StyledPageTwo= styled(motion.div)`
  position: relative;
  height: calc(100vh - 250px) };
  // height: auto;
  overflow-y: scroll;
  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */

  font-family: 'Noto Serif TC', serif;
  `;
