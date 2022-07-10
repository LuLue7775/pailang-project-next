import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import '../styles/globals.css';
import styled, { keyframes } from "styled-components";
import ModalStart from '../components/ModalStart';
import { useRouter } from 'next/router';

import { AnimatePresence } from 'framer-motion'


function MyApp({ Component, pageProps, data }) {
  const router = useRouter();

  return (
        <StyledApp className='app' id='app'>
            <StyledHeader className='header' route={router.pathname}>
              <Nav route={router.pathname} />
            </StyledHeader>
          
            <StyledLayout route={router.pathname}>
              <Component {...pageProps} />
            </StyledLayout>
        </StyledApp>    
  )
}

export default MyApp


const StyledApp = styled.div`
    position:relative;
    width: 100%;
    color: #000;
`;
const StyledHeader = styled.div`
    position: absolute;
    height: 60px;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    padding: 10px;

    a { 
        text-decoration: none; 
    }

    background-color: transparent;
`;

const StyledLayout = styled.div`
    position:relative;
    bottom: 0;
    z-index: 0;
  } };
`;

