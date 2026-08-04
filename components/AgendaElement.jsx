import React from 'react'
import { createMarkup } from '../utils/functions'
import Link from 'next/link'
import styled from 'styled-components'

// 語言判斷：只要 language 含 'EN'（涵蓋 'EN' / '英 EN'）即為英文，其餘一律視為繁中
const isEnglish = (item) => (item?.language || '').includes('EN')

/**
 * 依語言決定卡片主標題（繁中顯示中文標，英文顯示英文標）
 */
const getPrimaryTitle = (item) =>
  isEnglish(item) ? item?.title || item?.title_zh : item?.title_zh || item?.title

/**
 * 語言標籤：繁中 TC / 英 EN
 */
const getLangLabel = (item) => (isEnglish(item) ? '英 EN' : '繁中 TC')

const articleHref = (type, id) =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/article-${type}/${id}`
    : `${process.env.NEXT_PUBLIC_DOMAIN}/article-${type}/${id}`

export default function AgendaElement({ item }) {
  const { cover, start_date, end_date, type, artists, id, status } = item
  const primaryTitle = getPrimaryTitle(item)
  const badgeLabel = type === 'field' ? 'Field' : 'Journal'

  const Thumbnail = (
    <StyledImgContainer $type={type}>
      {cover ? (
        <StyledThumb src={cover} alt="" loading="lazy" />
      ) : (
        <StyledPlaceholder $type={type} />
      )}
    </StyledImgContainer>
  )

  return (
    <>
      {status !== 'draft' ? (
        <Link href={articleHref(type, id)}>
          <a>{Thumbnail}</a>
        </Link>
      ) : (
        Thumbnail
      )}

      <StyledInfo>
        <StyledBadge $type={type}>{badgeLabel}</StyledBadge>
        {status === 'draft' && <StyledBadgeHighlight>upcoming</StyledBadgeHighlight>}

        {/* 依語言只顯示單一主標題（繁中卡顯示中文標、英文卡顯示英文標） */}
        <StyledMainTitle
          className="font-title"
          dangerouslySetInnerHTML={primaryTitle && createMarkup(primaryTitle)}
        />

        <StyledMeta>
          {artists?.map((artist) => (
            <p key={artist.name}>{artist.name}</p>
          ))}
        </StyledMeta>

        {start_date && (
          <StyledMeta>
            {start_date}
            {end_date && ` - ${end_date}`}
          </StyledMeta>
        )}
        <StyledMeta>{getLangLabel(item)}</StyledMeta>
      </StyledInfo>
    </>
  )
}

const StyledImgContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: ${({ $type }) => ($type === 'field' ? '#fff' : '#000')};
`
const StyledThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;

  ${StyledImgContainer}:hover & {
    transform: scale(1.08);
  }
`
const StyledPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ $type }) => ($type === 'field' ? '#fff' : '#000')};
`

const StyledInfo = styled.div`
  width: 100%;
`
const StyledBadge = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 3px 8px;
  margin: 12px 0 8px;
  border-radius: 5px;
  font-size: 0.8rem;
  background-color: ${({ $type }) => ($type === 'field' ? '#fff' : '#000')};
  color: ${({ $type }) => ($type === 'field' ? '#000' : 'var(--main-color, #FFC93C)')};
`
const StyledBadgeHighlight = styled.span`
  display: inline-block;
  padding: 3px 8px;
  margin: 12px 0 8px 5px;
  border-radius: 5px;
  background-color: var(--agenda-tooltip-color, #f2e446);
  color: #000;
  font-size: 0.8rem;
`
const StyledMainTitle = styled.div`
  margin-top: 4px;
  width: fit-content;
  max-width: 100%;
  padding: 2px 5px;
  line-height: 1.4rem;
  font-size: 1.2rem;
  color: #000;
  cursor: pointer;

  /* 參考 Geoff Graham 的效果：靜止時無色塊，hover 時輔助色由下往上長滿、文字轉白 */
  background-image: linear-gradient(var(--aux-color, #2c558d), var(--aux-color, #2c558d));
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% 0%;
  transition: background-size 0.45s cubic-bezier(0.19, 1, 0.22, 1), color 0.3s ease;

  p {
    transition: color 0.3s ease;
  }

  &:hover {
    background-size: 100% 100%;
    color: #fff;
  }
  &:hover p {
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
const StyledMeta = styled.div`
  font-size: 0.8rem;
  line-height: 1.4rem;
  color: #000;
  font-family: var(--title-font-zh);
`
