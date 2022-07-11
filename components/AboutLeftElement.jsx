import { useEffect, useState } from 'react'
import Image from 'next/image'
import { LineSVGFull } from './Svgs'
import { containerLeftMotion, BGMotion } from '../utils/framerVariants'
import styled from "styled-components"
import { motion } from 'framer-motion'




export default function AboutLeftElement({ roles, parse }) {
    const [ scrollHeight, setScrollHeight ] = useState();
    useEffect(() => {
        setScrollHeight(document.getElementById('left').scrollHeight )
    }, [])
    

  return (
    <StyledLeftColContainer 
        id="left"
        className='leftcol-container'
        as={motion.div}
        variants={containerLeftMotion}
        initial="rest"
        whileHover="hover"
        animate="rest"
    >
    <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />
        { roles?.map(( elem, i ) => (
            <StyledPersonaContainer className='persona-container' key={i}>
                <LineSVGFull />
                <StyledLeftTitle className='persona-title'>
                    <h3> {elem.name} </h3>
                    <h4> {elem.name_zh} </h4>
                </StyledLeftTitle>
                <StyledImgContainer className='persona-img-continer'>
                    <Image className='persona-img' 
                            alt="pailang-persona" 
                            src={elem.cover || "https://via.placeholder.com/300X150.png"}
                            width={300}
                            height={150}
                    /> 
                </StyledImgContainer>
                <StyledPersonaEn className='persona-en en'>
                    {parse(elem.introduction)}
                </StyledPersonaEn>
      

                <StyledPersonaCh className='persona-ch zh'>
                    {parse(elem.introduction_zh)}
                </StyledPersonaCh>

            </StyledPersonaContainer>
        )) || "" }

        
    </StyledLeftColContainer>
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


const StyledLeftColContainer = styled(motion.div)`
    position: absolute;
    height: 100%;
    
    overflow-y:scroll;
    width: 33%;
`;
const StyledPersonaContainer = styled.div`
    margin: 30px 0 30px 0;
    padding: 30px 0 30px 0;

`;

const StyledLeftTitle = styled.div`
    padding: 10px;
    font-weight: bold;
    font-size: 1.1rem;
`;
const StyledImgContainer = styled.div`
    padding-left: 10px;
    
`;
const StyledPersonaEn = styled.div`
    padding: 10px;
    font-size:.6rem;
`;
const StyledPersonaCh = styled.div`
    padding: 10px;
    
`;