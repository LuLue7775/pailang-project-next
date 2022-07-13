import React from 'react'
import styled from "styled-components";
import { motion } from "framer-motion";

const coverVariant = {
    initial: {
      x: 0,
    },
    open: { 
      x: 0,
      transition: { 
        duration: .5
      }, 
    },
    closed: {
      x:"-100%",
      transition: { 
        duration: 1.8,
        delay: 1,
        ease: [0.8, 0.01, -0.05, 0.95],
      }, 
     }
  }

export default function Cover({ children,  modalShow }) {
  return (
    <StyledCover 
        as={motion.div}
        variants={coverVariant}
        animate={modalShow ? "open" : "closed"}
        initial="initial"
    >
        { children }
    </StyledCover>
    
  )
}

const StyledCover = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  
`