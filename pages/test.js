import React, { useEffect, useState } from 'react'
import styled from "styled-components";

import { LayoutGroup, AnimatePresence, motion } from 'framer-motion'


const container = {
    hidden: {  opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 1, staggerDirection: -1, }
    }
  };

const transition = {
    ease: [0.5, 0.01, -0.05, 0.9]
}
const child = {
    hidden: {
        y: 400
    },
    visible: {
        y: 0,
        transition: { duration: 1, ...transition }
    }
};
export default function Test({ data }) {

    const [response, setResponse] = useState()


    let titleSplit = "staggerChildren".split("");

    return (
        <AnimatePresence>
        <StyledTitleContainer>
        <StyledTitle 
            as={motion.h1}
            className='main-title'
            
            // variants={container}
            // initial={{ opacity: 0, }} 
            // animate={{ 
            //     opacity: 1,
                
            //     transition: { staggerChildren: 0.3, delayChildren: 1, staggerDirection: -1, }
            // }} 
            // exit={{
            //   opacity: 0,
            // }}
        > 
            { titleSplit?.map((char, i) => (
                <motion.span key={i}
                    style={{ position: "absolute", left: i*50 }}
                    variants={child}
                    initial={{ opacity: 0, translateY:50 }} 
                    animate={{ 
                        opacity: 1,
                        translateY: 0,
                        transition: {
                            delay: i*0.05
                            
                        }
                    }} 
                
                >
                    {char }
                </motion.span>
            )) }

            {/* <motion.span variants={child}> </motion.span> */}


        </StyledTitle>

    </StyledTitleContainer>
     </AnimatePresence>
    )
}


// export async function getStaticProps() {
//     const DIRECTUS_API = process.env.DIRECTUS
    
//     const fetchData = async( route ) => {
//         const res = await fetch(`${ DIRECTUS_API + route }`, {
//             method: 'GET', 
//             headers: { 'Content-Type': 'application/json' }
//         })
//         const resJson = await res.json()
        
//         if ( resJson.errors ) throw resJson.errors
//         return resJson
//     }

//     const data = await fetchData('/about').catch((e) => console.log(e))

//     return {
//       props: {
//         data,
//       }, 
//       revalidate: 60    
// }
//   }


  
const StyledTitleContainer = styled.div`
height: auto;
width: 100%;
padding-top: 10px;
display: flex;
flex-direction: column;
align-items: center;
// color: #FFF;
display: ${({ route }) => {
        if (route === '/about') return 'none'
        if (route === '/agenda') return 'none'
        else return ''  
} };


font-family: 'Noto Serif TC', serif;
letter-spacing: 2px;
`;

const StyledTitle = styled(motion.h1)`
color: #FFF;
display:inline;

font-family: "RiccioneSerial";
font-size: 3rem;
letter-spacing: 5px;
font-weight: 500;
`;
