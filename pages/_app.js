import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/globals.css'
import styled, { keyframes } from "styled-components";
import ModalStart from '../components/ModalStart';

import {gsap} from 'gsap';
import { CSSRulePlugin } from "gsap/dist/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);

function MyApp({ Component, pageProps }) {

  const [modalShow, setModalShow] = useState(false); //default true
  useEffect(() => {
      setTimeout(() => { 
          setModalShow(false);
      }, 3000 );
  }, []);


  return (
  <StyledApp className='app' id='app'>
    <StyledContent modalShow={modalShow}>
        {/* <Header/> */}
        <StyledLayout>
          <Component {...pageProps} />
        </StyledLayout>
    </StyledContent>

    {/* <ModalStart modalShow={modalShow} />        */}
    <div id="portal"></div>
  </StyledApp>
    
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
const StyledLayout = styled.div`
    position:relative;
    bottom: 0;
    z-index: 0;

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
