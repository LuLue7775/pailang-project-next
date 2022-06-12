import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import dataJson from '../dataset.json';
import styled from "styled-components";

export default function Header() {
    const { homePage, videoPage } = dataJson; 

    const router = useRouter();
  return (
    <StyledHeader className='header' route={router.pathname}>
        <StyledNavContainer className='nav-container'>
            <StyledNavLeft>
                <Link href="/second">
                    <a>
                    <StyledNavItem> 誌 PAILANG`&apos;`S journal for live versioning </StyledNavItem>
                    </a>
                </Link>
                { router.pathname === '/second' && 
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

        
        <StyledTitleContainer className='titles' route={router.pathname} >
            <Link href="/">
                <a>
                <StyledTitleContainer>
                    <StyledTitle className='main-title'> 
                        { router.pathname !== '/video' 
                            ? `${homePage.titleLines.mainTitle.h1Title}`
                            : `${videoPage.titleLines.mainTitle.h1Title}`
                        }
                    </StyledTitle>
                    <StyledSubTitle>
                        { router.pathname !== '/video' 
                            ? `${homePage.titleLines.mainTitle.subTitle}`
                            : `${videoPage.titleLines.mainTitle.subTitle}`
                        }
                    </StyledSubTitle>
                </StyledTitleContainer>
                </a>
            </Link>

            <StyledTitleLines>
                { router.pathname !== '/video' 
                    ? homePage.titleLines.lines.map((line, i) => 
                        <div key={i}> {line.map((item, i) => ( <div key={i}>{item}</div>))} </div>
                    )
                    : videoPage.titleLines.lines.map((line, i) => 
                        <div key={i}> {line.map((item, i) => ( <div key={i}>{item}</div>))} </div>
                    )
                }
            </StyledTitleLines>
        </StyledTitleContainer>
        


        
    </StyledHeader>
  )
};



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
const StyledTitleContainer = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // color: #FFF;
    display: ${({ route }) => {
            if (route === '/about') return 'none'
            if (route === '/agenda') return 'none'
            else return ''  
    } };
`;

const StyledTitle = styled.h1`
    color: #FFF;
    display:inline;
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
`;


const StyledNavContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: .6rem;
    color: #FFF;
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
