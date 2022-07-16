import React, {useEffect, useState} from 'react'
import Link from 'next/link'
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

export default function Nav({ modalShow }) {
    const router = useRouter()
    const [isRouteChange, setRouteChange] = useState(false)

    const isArticle = router.pathname.startsWith("/article-scenography")
    const parseURL = `${router.pathname.split('/')[1]}/${router.query.id}`

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
        <StyledNavContainer className='nav-container '>
            <StyledNavLeft>
                {
                    isArticle && 
                    <Link href={`/${parseURL}`}>
                        <a>
                        <StyledNavItem> live versioning</StyledNavItem>
                        </a>
                    </Link>
                }
            </StyledNavLeft>
            
            <StyledNavRight>
               { !modalShow && 
               <>
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
               </>}
            </StyledNavRight>
        </StyledNavContainer>

    </LayoutGroup>
  )
};

const StyledNavContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .8rem;
    font-family: var(--title-font-en), serif;

`;
const StyledNavLeft = styled.div`
    display: flex;
    color: #000;
    
`;
const StyledNavRight = styled.div`
    display: flex;
`;
const StyledNavItem = styled.div`
    padding: 0 6px 0 6px;
`;
