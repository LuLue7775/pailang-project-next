import { useEffect, useState } from 'react'
import { LineSVGFull } from './Svgs'
import { containerLeftMotion, BGMotion, containerTextMotion } from '../utils/framerVariants'
import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function AboutLeftElement({ roles, createMarkup }) {
  const [isHovered, setHovered] = useState(false)

  // calculate scroll height
  const [scrollHeight, setScrollHeight] = useState()
  useEffect(() => {
    setScrollHeight(document.getElementById('mid').scrollHeight)
  }, [])

  return (
    <StyledLeftColContainer
      id="left"
      className="leftcol-container"
      as={motion.div}
      variants={containerLeftMotion}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      isHovered={isHovered}
    >
      <MotionBG variants={BGMotion} scrollHeight={scrollHeight} />
      {roles?.map((elem, i) => (
        <motion.div
          className="persona-container"
          key={i}
          variants={containerTextMotion}
        >
          <LineSVGFull />
          <StyledLeftTitle className="persona-title">
            <StyledEnTitle > {elem?.name} </StyledEnTitle>
            <StyledZhTitle > {elem?.name_zh} </StyledZhTitle>
          </StyledLeftTitle>

          <ImageContainer>
            <Image
                className="persona-img"
                alt="pailang-persona"
                src={elem?.cover || 'https://via.placeholder.com/300X150.png'}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit= 'contain'
              />
          </ImageContainer>

          <StyledPersonaEn className="persona-en" dangerouslySetInnerHTML={ elem?.introduction && createMarkup(elem?.introduction)} /> 

          <StyledPersonaCh className="persona-ch" dangerouslySetInnerHTML={ elem?.introduction_zh && createMarkup(elem?.introduction_zh)} /> 

        </motion.div>
      )) || ''}
    </StyledLeftColContainer>
  )
}

const ImageContainer = styled.div`
  width: min(200px, 100%);
`
const MotionBG = styled(motion.div)`
  position: absolute;
  // height: ${({ scrollHeight }) => scrollHeight && `${scrollHeight}px`};
  height: auto;
  z-index: -1;
  width: 100%;
`

const StyledLeftColContainer = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 30%;
  overflow-y: scroll;
  padding-bottom: 100px;

  ${({ isHovered }) => isHovered && "background-image: url('/about.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
`

const StyledLeftTitle = styled.div`
  padding: 10px;
  font-weight: 600;
`

const StyledEnTitle = styled.div`
  font-size: 1.2rem;
  // font-family: var(--main-font-en, sans-serif);

`
const StyledZhTitle = styled.div`
  font-size: 1.2rem;
  // font-family: var(--main-font-zh, sans-serif);

`

const StyledPersonaEn = styled.div`
  padding: 10px;
`
const StyledPersonaCh = styled.div`
  padding: 10px;
`
