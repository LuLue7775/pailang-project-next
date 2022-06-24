import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import '../styles/globals.css'
import styled, { keyframes } from "styled-components";
import ModalStart from '../components/ModalStart';
import { useRouter } from 'next/router';

import { gsap } from 'gsap';
import { CSSRulePlugin } from "gsap/dist/CSSRulePlugin";

import { AnimatePresence } from 'framer-motion'

gsap.registerPlugin(CSSRulePlugin);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [modalShow, setModalShow] = useState(false); //default true
  useEffect(() => {
      setTimeout(() => { 
          setModalShow(false);
      }, 3000 );
  }, []);


  return (
    <AnimatePresence
      // exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <StyledApp className='app' id='app'>
        <StyledContent modalShow={modalShow}>

            <StyledHeader className='header' route={router.pathname}>
              <Nav route={router.pathname} />
            </StyledHeader>
          
            <StyledLayout route={router.pathname}>
              <Component {...pageProps} />
            </StyledLayout>

        </StyledContent>

        {/* <ModalStart modalShow={modalShow} />        */}
        <div id="portal"></div>
      </StyledApp>
              
  </AnimatePresence>
  )
}

export default MyApp

const StyledApp = styled.div`
    position:relative;
    height: 100vh;
    width: 100%;
    background: rgb(0,0,0);
    background: radial-gradient(circle, rgba(0,0,0,0.8241302588996764) 0%, rgba(0,0,0,1) 82%);
`;
const StyledHeader = styled.div`
    height: ${({ route }) => {
        if (route === '/about') return '50px'
        if (route === '/agenda') return '50px'
        else return '250px'
    } };
    width: 100%;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    padding: ${({ route }) => {
        if (route === '/about') return '15px'
        if (route === '/agenda') return '15px'
        else return ''
    } };

    a { 
        text-decoration: none; 
        color: #F5F4F4EF;
    }

    background-color: transparent;
`;

const StyledLayout = styled.div`
    position:relative;
    bottom: 0;
    z-index: 0;
    padding-top: ${({ route }) => {
      if (route === '/about') return '50px'
      if (route === '/agenda') return '50px'
      else return '250px'
  } };
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
/**
 * Make these gsap to animate elements one by one.
 */
const StyledContent = styled.div` 
    animation-delay: 2s;
    animation: ${({modalShow})=> modalShow ? '' : fadeIn } .3s linear ;
    opacity: ${({modalShow})=> modalShow ? 0 : 1};
`;
