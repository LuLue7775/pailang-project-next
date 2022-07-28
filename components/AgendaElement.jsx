import { useEffect, useState } from 'react'
import { imgWrapVariant, slideVariant } from '../utils/framerVariantsAgenda'
import { createMarkup } from '../utils/functions'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from 'framer-motion'


export default function AgendaElement({ item, activeExpand, expandIndex }) {
  const { title, title_zh, cover, start_date, end_date, type, language, artist, id, status } = item
  const [isexpand, setExpand] = useState(false)

  // one expand card at a time
  useEffect(() => {
    if (activeExpand === expandIndex) setExpand(true)
    else setExpand(false)
  }, [activeExpand])

  return (
    <>
      <StyledImgContainer
        isexpand={isexpand}
        as={motion.div}
        variants={imgWrapVariant}
        animate={isexpand ? 'open' : 'closed'}
        initial="initial"
      >
          { status !== 'draft' ? (
              <>
                <Link
                  href={
                    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
                      ? `http://localhost:3000/article-${type}/${id}`
                      : `${process.env.NEXT_PUBLIC_DOMAIN}/article-${type}/${id} `
                  }
                >
                    { cover && (
                        <Image
                          alt=""
                          width="100%"
                          height="100%"
                          src={cover}
                          layout="responsive"
                          objectFit='cover'
                          crossOrigin="true"
                        />
                    )}
                </Link>

                { isexpand && <StyledTooltip> view event </StyledTooltip>}
              </>
            )
          :
            cover && (
              <Image
                alt=""
                width="100%"
                height="100%"
                src={cover}
                layout="responsive"
                crossOrigin="true"
              />
            )
          }

      </StyledImgContainer>

      <StyledSlide as={motion.div} variants={slideVariant} animate={isexpand ? 'open' : 'closed'}>
        {' '}
      </StyledSlide>

      <div>
        <StyledSm className="zh">{type} </StyledSm>
        <StyledMainTitle >{title} </StyledMainTitle>
        <StyledZhTitle className="zh"  dangerouslySetInnerHTML={ title_zh && createMarkup(title_zh)} /> 
        <StyledTitle > {artist} </StyledTitle>
        <StyledTitle > {start_date}-{end_date}{' '} </StyledTitle>
        <StyledTitle > {language} </StyledTitle>
      </div>
    </>
  )
}

const StyledImgContainer = styled(motion.div)`
  position: relative;
  width: min(300px, 100%);
  // height: ${({ isexpand }) => (isexpand ? '300px' : '100px')};

  background-color: #000;
  margin: 10px 0 10px 0;

  overflow: hidden;
  z-index: 0;

`

const StyledSm = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  margin: 5px 0;
  border-radius: 5px;
  background: var(--main-color);

  color: #fff;
`
const StyledMainTitle = styled.div`
  font-size: 1.1rem;
  font-family: var(--title-font-en);
`
const StyledZhTitle = styled.div`
  font-weight: 600;
`
const StyledTitle = styled.div`
  font-size: .8rem;
  line-height: 1.3rem;
  font-family: var(--title-font-zh);

`
const StyledSlide = styled(motion.div)`
  position: absolute;
  top: 0;
  margin: 10px;
  height: 100%;
  width: 100%;
  max-width: 310px;
  background-color: var(--agenda-slide-color, #f2e446);
  z-index: -1;
`

const StyledTooltip = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;
  height: 1.5rem;
  width: 120px;
  display: flex;
  justify-content: center;
  background-color: var(--agenda-tooltip-color, #f2e446);
  border-radius: 10px;
  z-index: 1;

  &:after {
    border-right: solid 10px transparent;
    border-left: solid 10px transparent;
    border-bottom: solid 10px var(--agenda-tooltip-color, #f2e446);
    transform: translateX(-50%);
    position: absolute;
    z-index: 1;
    content: '';
    bottom: 100%;
    left: 50%;
    height: 0;
    width: 0;
  }
`
