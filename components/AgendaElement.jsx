import React, { useEffect, useState, useRef } from 'react'
import { imgWrapVariant, slideVariant } from '../utils/framerVariantsAgenda'
import { createMarkup } from '../utils/functions'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ImageWithLink = React.forwardRef((props, ref) => {
  const { cover } = props
  return cover ? (
    <div ref={ref}>
      <Image
        alt=""
        width={300}
        height={300}
        src={cover}
        layout="responsive"
        objectFit="cover"
        crossOrigin="true"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  ) : (
    <ImagePlaceholder />
  )
})
ImageWithLink.displayName = 'ImageWithLink'

export default function AgendaElement({ item, activeExpand, expandIndex }) {
  const { title, title_zh, cover, start_date, end_date, type, language, artists, id, status } = item
  const [isExpand, setExpand] = useState(false)
  // one expand card at a time
  useEffect(() => {
    if (activeExpand === expandIndex) setExpand(true)
    else setExpand(false)
  }, [activeExpand])

  const imageRef = useRef(null)

  return (
    <>
      <StyledImgContainer
        $isExpand={isExpand}
        as={motion.div}
        variants={imgWrapVariant}
        animate={isExpand ? 'open' : 'closed'}
        initial="initial">
        {status !== 'draft' ? (
          <>
            <Link
              href={
                !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
                  ? `http://localhost:3000/article-${type}/${id}`
                  : `${process.env.NEXT_PUBLIC_DOMAIN}/article-${type}/${id} `
              }>
              <a>
                <ImageWithLink ref={imageRef} cover={cover} />
              </a>
            </Link>
          </>
        ) : (
          cover && <ImageWithLink ref={imageRef} cover={cover} />
        )}
      </StyledImgContainer>

      <StyledSlide
        as={motion.div}
        variants={slideVariant}
        animate={isExpand ? 'open' : 'closed'}></StyledSlide>

      <div>
        <StyledBadge> {type === 'video' ? 'cinema' : type} </StyledBadge>
        {status === 'draft' && <StyledBadgeHighlight> upcoming </StyledBadgeHighlight>}

        <StyledMainTitle
          className="font-ogg"
          dangerouslySetInnerHTML={title && createMarkup(title)}
        />
        <StyledZhTitle
          className="font-zh-sans"
          dangerouslySetInnerHTML={title_zh && createMarkup(title_zh)}
        />
        <StyledTitle>
          {artists?.map((artist) => (
            <p key={artist.name}> {artist.name} </p>
          ))}
        </StyledTitle>

        <StyledTitle>
          {start_date} {end_date && ` - ${end_date}`}
        </StyledTitle>
        <StyledTitle> {language} </StyledTitle>
      </div>
    </>
  )
}

const StyledImgContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
  background-color: #000;
`
const ImagePlaceholder = styled.div`
  width: 100%;
  padding-bottom: 100%; // 1:1 aspect ratio
  background-color: #000;
`


const StyledBadge = styled.span`
  width: fit-content;
  padding: 4px;
  margin: 10px 5px;
  border-radius: 5px;
  background: var(--main-color, #e0954f);
  color: #fff;
  font-size: 0.8rem;
`
const StyledBadgeHighlight = styled.span`
  width: 100px;
  padding: 4px;
  margin: 10px 5px;
  border-radius: 5px;
  background-color: var(--agenda-tooltip-color, #f2e446);
  color: #000;
  font-size: 0.8rem;
`
const StyledMainTitle = styled.div`
  margin-top: 10px;
  line-height: 1.3rem;
  font-size: 1.2rem;
`
const StyledZhTitle = styled.div`
  font-weight: 600;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
`
const StyledTitle = styled.div`
  font-size: 0.8rem;
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
