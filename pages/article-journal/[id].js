import React, { useEffect, useLayoutEffect } from 'react'
import JournalLeftCol from '../../components/JournalLeftCol';
import JournalRightCol from '../../components/JournalRightCol';
import { UpChevronSVG } from '../../components/Svgs';
import styled from "styled-components";
import { motion, useSpring } from "framer-motion";
import ArticlesHeader from '../../components/ArticlesHeader';
import NodesContainer from '../../components/NodesContainer';




export default function Journal({ data }) {
    console.log(data)
  const spring = useSpring(0, { damping: 100, stiffness: 1000    });
    

  function slideTo(to) {
    spring.set(window.pageYOffset, false);
    setTimeout(() => {
      spring.set(to);
    }, 50);
  }

  useLayoutEffect(() => {
      spring.onChange(latest => {
        window.scrollTo(0, latest);
      });
    }, [spring]);

  return (
    <StyledContainer>
      <ArticlesHeader data={data} slideTo={slideTo}/>
      
      <StyledJournal id="section2" className='pOne-content-container' >
        <StyledChevron onClick={() => slideTo(0)}> 
            <UpChevronSVG/>
        </StyledChevron>

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
            <JournalLeftCol content={data?.content} />
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
           
           <NodesContainer data={data}/>
        </StyledJournalRightCol>
      </StyledJournal>

      
    </StyledContainer>
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

    const data = await fetchData(`/article-journal/${id}`).catch(err => console.error(err) ) 

    return {
      props: { 
          data: data?.data || '',
      },
    };
  }

export async function getStaticPaths() {

    return {
        paths: [
            { params: { id: '2' } },
            { params: { id: '3' } }, 
            { params: { id: '4' } } 
          ],
        fallback: true
    };
  }

  
const StyledChevron = styled.div`
  position: absolute;
  top:0;
  width:100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;


  const StyledContainer = styled.div`
    height: 200vh;
    width: 100%;
    overflow: hidden;

  `
  const StyledHeader = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  /**
   * @TODO media query on height and fontsize
   */
  const StyledTitles = styled.div`
    text-align: center;
    height: 55vh;
    
  `
  const StyledSubtitles = styled.div`
    height: 15vh;
    display: grid;
    grid-template-columns: 1fr 30% 30% 30% 1fr;
    justify-items: center;
    align-items: center;

  `

  const StyledJournal = styled.div`
    position: relative;
    display:grid;
    grid-template-columns:2fr 3fr;
    height: 100vh;
    width: 100%;
    padding-top: 60px;


    font-family: 'Noto Serif TC', serif;
    font-weight: 200;
    letter-spacing: 1px;
`;

const StyledJournalLeftCol = styled(motion.div)`
  height: 100%;
  overflow-y:scroll;
  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */
  
  font-size: .9rem;
`;

const StyledJournalRightCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  
  height: 100%;

  border-left: 1px #FFB304 dashed;

  overflow-y:scroll;
  ::-webkit-scrollbar { width: 0; };
  scrollbar-width: none; /* Firefox */

`;

