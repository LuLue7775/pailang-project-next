import { useEffect, useState } from 'react'
import Image from 'next/image'
import { LineSVGFull } from './Svgs'
import { containerLeftMotion, BGMotion, containerTextMotion } from '../utils/framerVariants'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function AboutLeftElement({ roles, parse }) {
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
        <StyledPersonaContainer
          className="persona-container"
          key={i}
          as={motion.div}
          variants={containerTextMotion}
        >
          <LineSVGFull />
          <StyledLeftTitle className="persona-title">
            <h3> {elem?.name} </h3>
            <h4> {elem?.name_zh} </h4>
          </StyledLeftTitle>
          <StyledImgContainer className="persona-img-continer">
            <Image
              className="persona-img"
              alt="pailang-persona"
              src={elem?.cover || 'https://via.placeholder.com/300X150.png'}
              width="100%"
              height="100%"
              layout="responsive"
            />
          </StyledImgContainer>
          <StyledPersonaEn className="persona-en en">
            {elem?.introduction && parse(elem?.introduction)}
          </StyledPersonaEn>
          <StyledPersonaCh className="persona-ch zh">
            {elem?.introduction_zh && parse(elem?.introduction_zh)}
          </StyledPersonaCh>
        </StyledPersonaContainer>
      )) || ''}
    </StyledLeftColContainer>
  )
}

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
  overflow-y: scroll;
  width: 30%;
  ${({ isHovered }) => isHovered && "background-image: url('/about.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
`
const StyledPersonaContainer = styled(motion.div)`
  // padding: 100px;
`

const StyledLeftTitle = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 1.1rem;
`
const StyledImgContainer = styled.div`
  padding-left: 10px;
  height: 150px;
  width: 300px;
  overflow: hidden;
`
const StyledPersonaEn = styled.div`
  padding: 10px;
`
const StyledPersonaCh = styled.div`
  padding: 10px;
`
