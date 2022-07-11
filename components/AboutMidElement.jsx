import { useEffect, useState } from 'react'
import { containerMidMotion, BGMotion } from '../utils/framerVariants'
import styled from "styled-components"
import { motion } from 'framer-motion'

export default function AboutMidElement({ content, content_zh, parse }) {
    const [ scrollHeight, setScrollHeight ] = useState();
    useEffect(() => {
        setScrollHeight(document.getElementById('mid').scrollHeight +1000 )
    }, [])
    
  return (
    <StyledMidColContainer
        id="mid"
        as={motion.div}
        variants={containerMidMotion}
        initial="rest"
        whileHover="hover"
        animate="rest"
    >
        <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />
        <StyledMidContent>
            <StyledMidTitle> Pailang Settlers Museum </StyledMidTitle>
            <StyledMidEn className='en'> {content && parse(content)} </StyledMidEn>
            <StyledMidCh className='zh'> {content_zh && parse(content_zh)} </StyledMidCh>
        </StyledMidContent>
    </StyledMidColContainer>
  )
}


const MotionBG = styled(motion.div)`
    position: absolute;
    z-index:-1;
    height: ${({ scrollHeight }) => scrollHeight &&  `${scrollHeight}px`};
    width: 100%;
    background-color: #fff;

    background-image:
      radial-gradient(circle farthest-side at 10% 89%, rgba(250, 170, 50,1) 0px, transparent 50%),
      radial-gradient(circle farthest-corner at 35% 0%,  rgba(250, 97, 55,1) 0px, transparent 50%),
      radial-gradient(at 93% 46%, rgba(255, 255, 255,1) 0px, transparent 50%),
      radial-gradient(circle farthest-side  at 23% 49%,rgba(247, 138, 119,1) 0px, transparent 50%),
      radial-gradient(at 17% 27%, rgba(255, 255, 255,1) 0px, transparent 50%),
      radial-gradient(at 79% 30%,  rgba(230, 70, 50,1) 0px, transparent 50%),
      radial-gradient(at 26% 40%, hsla(36,65%,63%,1) 0px, transparent 50%);
`;

const StyledMidColContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 35%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 30px 20px 30px;

    overflow-y:scroll;
`;
const StyledMidContent = styled.div`
    position: absolute;
    top: 15vh; 
    margin: 30px;
`;

const StyledMidTitle = styled.h3`
    text-align: center;

`;
const StyledMidEn = styled.div`
    font-size:.6rem;
    padding: 15px 0 15px 0;
`;
const StyledMidCh = styled.div`
    font-size:.7rem;
    padding: 15px 0 15px 0;

`;



