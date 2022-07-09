import React, { useEffect, useState } from 'react'
import styled from "styled-components";

import { LayoutGroup, AnimatePresence, motion } from 'framer-motion'

import JournalLeftCol from '../components/JournalLeftCol';

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
export default function JournalTest() {

    return (
        <>
        <StyledHeader>
          {/* <h1>{ data.title }</h1> */}
        </StyledHeader>
        
        <StyledJournal className='pOne-content-container' >
  
          <StyledJournalLeftCol 
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
              <JournalLeftCol  />
          </StyledJournalLeftCol>
  
          <StyledJournalRightCol 
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
              {/* <JournalRightCol/> */}
          </StyledJournalRightCol>
        </StyledJournal>
      </>
    )
}



// export async function getStaticProps({ params }) {
//     const id = params.id;

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

//     const data = await fetchData(`/article-journal/${id}`).catch(err => console.error(err) ) 

//     return {
//       props: { 
//           data: data?.data,
//       },
//     };
//   }

// export async function getStaticPaths() {


//     // const id = dataJson.pages.first;
//     // console.log(id)
//     return {
//         paths: [
//             { params: { id: '2' } },
//             { params: { id: '3' } }, 
//             { params: { id: '4' } } 
//           ],
//         fallback: true
//     };
//   }


  const StyledHeader = styled.div`
    // height: 100vh;
    width: 100%;
  `

  const StyledJournal = styled.div`
//   position: relative;
//   display:grid;
//   grid-template-columns:2fr 3fr;
//   // height: auto;

`;

const StyledJournalLeftCol = styled(motion.div)`
//   height: 100%;
//   overflow-y:scroll;
  
//   ::-webkit-scrollbar { width: 0; };
//   scrollbar-width: none; /* Firefox */

//   font-size: .9rem;
`;

const StyledJournalRightCol = styled(motion.div)`
//   display: flex;
//   flex-direction: column;
//   overflow-y:scroll;
//   height: 100%;
//   border-left: 1px #FFB304 dashed;


//   ::-webkit-scrollbar { width: 0; };
//   scrollbar-width: none; /* Firefox */

`;

