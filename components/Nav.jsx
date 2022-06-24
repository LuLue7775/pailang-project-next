import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import dataJson from '../dataset.json';
import styled from "styled-components";
import { LayoutGroup, AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

      
const container = {
    hidden: {  opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 1, delayChildren: 1, staggerDirection: -1, }
    }
  };

const transition = {
    ease: [0.5, 0.01, -0.05, 0.9],
}
const child = {
    hidden: {
        y: 400
    },
    visible: {
        y: 0,
        transition: { duration: 2, ...transition }
    }
};

export default function Nav({ route }) {
    const { homePage, videoPage } = dataJson; 
    let mainTitle = route !== '/video'  ? `${homePage.titleLines.mainTitle.h1Title}` : `${videoPage.titleLines.mainTitle.h1Title}`
    // let titleSplit = Array.from(mainTitle);

    const router = useRouter()

    const [isRouteChange, setRouteChange] = useState(false)
    useEffect(() => {
        const handleRouteChange = () => setRouteChange(false)
        const handleRouteComplete = () => setRouteChange(true)

        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeComplete', handleRouteComplete)
    
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
          router.events.off('routeChangeStart', handleRouteChange)
          router.events.off('routeChangeComplete', handleRouteComplete)
        }
      }, [])


  return (
    <LayoutGroup type="crossfade">
        <StyledNavContainer className='nav-container'>
            <StyledNavLeft>
                <Link href="/second">
                    <a>
                    <StyledNavItem> 誌 PAILANG`&apos;`S journal for live versioning </StyledNavItem>
                    </a>
                </Link>
                { route === '/second' && 
                    <Link href="/">
                        <StyledNavItem> 2F</StyledNavItem>
                    </Link>
                }
            </StyledNavLeft>
            <StyledNavRight>
                <Link href="/video">
                    <a>
                    <StyledNavItem> VIDEO </StyledNavItem>
                    </a>
                </Link> 
                <Link href="/about">
                    <a>
                    <StyledNavItem> ABOUT </StyledNavItem>
                    </a>
                </Link> 
                <Link href="/agenda">
                    <a>
                    <StyledNavItem> AGENDA </StyledNavItem>
                    </a>
                </Link>
            </StyledNavRight>
        </StyledNavContainer>

       
        <StyledTitleContainer layoutId="title" className='titles' route={route} >
            <Link href="/">
                <a>
                <AnimatePresence>
                <StyledTitleContainer>
                    {isRouteChange && <StyledTitle 
                        as={motion.h1}
                        // layout
                        initial={{ opacity: 0, translateY:50 }} 
                        animate={{ 
                            opacity: 1,
                            translateY: 0,
                            transition: {
                                delay: 0.5 
                            }
                        }} 
                    > 
                        {mainTitle}
                    </StyledTitle>}
                    <StyledSubTitle>
                        { route !== '/video' 
                            ? `${homePage.titleLines.mainTitle.subTitle}`
                            : `${videoPage.titleLines.mainTitle.subTitle}`
                        }
                    </StyledSubTitle>
                </StyledTitleContainer>
                </AnimatePresence>
                </a>
            </Link>

            <StyledTitleLines>
                { route !== '/video' 
                    ? homePage.titleLines.lines.map((line, i) => 
                        <div key={i}> {line.map((item, i) => ( <div key={i}>{item}</div>))} </div>
                    )
                    : videoPage.titleLines.lines.map((line, i) => 
                        <div key={i}> {line.map((item, i) => ( <div key={i}>{item}</div>))} </div>
                    )
                }
            </StyledTitleLines>
        </StyledTitleContainer>
        

    </LayoutGroup>
  )
};




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
    // letter-spacing: 5px;
    font-weight: 500;

    overflow: hidden;
`;

const StyledSubTitle = styled.h3`
    color: #F5F4F4dF;
    display:inline;
    
`;
const StyledTitleLines = styled.div`
    padding: 10px;
    color: #F5F4F4dF;
    font-size: .8rem;
    text-align: center;
    font-weight: 300;

`;


const StyledNavContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: .6rem;
    color: #FFF;

    font-family: 'Noto Serif TC', serif;
`;
const StyledNavLeft = styled.div`
    display: flex;
    color: #F5F4F4dF;
    color: #FFF;

`;
const StyledNavRight = styled.div`
    display: flex;
`;
const StyledNavItem = styled.div`
    padding: 0 6px 0 6px;
`;
