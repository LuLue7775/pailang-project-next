import { useState, useContext, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArticlesHeader from './ArticlesHeader'
import { CursorContext } from '../context/cursorContext'
import { createMarkup, slideTo } from '../utils/functions'

import styled, { css, keyframes } from 'styled-components'

// 展開鈕的呼吸閃爍：輕微放大＋透明度起伏，提示可點擊展開
const breathe = keyframes`
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
`

// 收合時圖片預覽條的高度（像時間線上的視覺色帶）
const STRIP_HEIGHT = 56

// timeline 的金黃色沿用主題色 --main-color（垂直線、圓點、地點標籤文字）
const GOLD = 'var(--main-color, #e0a63c)'

// 語言判斷：與 agenda 相同，language 含 'EN' 即為英文
const isEnglish = (data) => (data?.language || '').includes('EN')

// field 的圖片欄位存的是完整 URL，而 ArticlesHeader 會自行補上 assets 路徑，
// 因此傳進 header 前先把前綴移除，避免路徑重複。
const stripAssetPrefix = (url) => url?.replace(/^https?:\/\/[^/]+\/assets\//, '')

// 標題若是純文字（沒有 <p> 等標籤），補上 <p> 讓 titleEn 套用到與 article-journal
// 相同的字級樣式（AnimatedTitles 的字級是掛在 <p> 上）。
const wrapTitle = (t) => (t && !/^\s*</.test(t) ? `<p>${t}</p>` : t)

// timeline 每個子項目左側「彎曲虛線 + 圓點」連接線
function Connector() {
  return (
    <svg width="64" height="30" viewBox="0 0 64 30" fill="none" aria-hidden="true">
      <path
        d="M18 0 Q18 16 35 16 L53 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1.5 3.5"
        strokeLinecap="round"
      />
      <circle cx="57.5" cy="16" r="3.6" fill="currentColor" />
    </svg>
  )
}

// 展開／收合的箭頭（收合時朝下，展開時旋轉朝上）
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * timeline 單一子項目（手風琴式）。
 * - 行動版：初始收合成「只有地點名稱＋展開提示箭頭」，點擊名稱列展開，圖片＋圖說堆疊在
 *   名稱下方、同一欄（單欄）。
 * - 桌機版：維持雙欄（名稱 | 圖片），收合時圖片顯示為細長預覽條，點擊就地展開。
 *   沒有圖片的子項目，圖說同樣收合成 STRIP_HEIGHT 高的預覽（與圖片收合高度一致）。
 */
function TimelineDetail({ detail, lang }) {
  const hasImage = !!detail.image
  const hasCaption = !!detail.caption
  const [open, setOpen] = useState(false)

  // 沒有圖片時：圖說本身若不超過預覽條高度，就不需要收合
  const textRef = useRef(null)
  const [textFits, setTextFits] = useState(false)
  useEffect(() => {
    const el = textRef.current
    if (!el) return
    // 行動版收合時元素被隱藏（高度 0），不量測，避免狀態來回切換
    const measure = () => el.scrollHeight && setTextFits(el.scrollHeight <= STRIP_HEIGHT + 8)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const collapsible = hasImage || (hasCaption && !textFits)
  const { setHoverEvent } = useContext(CursorContext)

  const toggle = () => collapsible && setOpen((o) => !o)
  const hoverIn = collapsible ? () => setHoverEvent('expand') : undefined
  const hoverOut = collapsible ? () => setHoverEvent('default') : undefined

  const caption = hasCaption && (
    <StyledCaption className={lang} dangerouslySetInnerHTML={createMarkup(detail.caption, lang)} />
  )

  return (
    <StyledDetail>
      <StyledConnector>
        <Connector />
      </StyledConnector>

      <StyledBody>
        {/* 名稱列：行動版可點擊展開，右側箭頭為展開提示（收合時呼吸閃爍） */}
        <StyledNameRow
          $clickable={collapsible}
          onClick={toggle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
          role={collapsible ? 'button' : undefined}
          aria-expanded={collapsible ? open : undefined}>
          <StyledName $clickable={collapsible} $lang={lang}>
            {detail.name}
          </StyledName>
          {collapsible && (
            <StyledNameChevron $open={open} aria-hidden="true">
              <ChevronIcon />
            </StyledNameChevron>
          )}
        </StyledNameRow>

        <StyledMedia $open={open} $collapsible={collapsible}>
          {hasImage ? (
            <>
              <StyledImageClip
                onClick={toggle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                animate={{ height: open ? 'auto' : STRIP_HEIGHT }}
                initial={false}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                $open={open}
                role="button"
                aria-expanded={open}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={detail.image} alt={detail.name || 'timeline image'} />
                <StyledExpandBtn $open={open}>
                  <ChevronIcon />
                </StyledExpandBtn>
              </StyledImageClip>

              <AnimatePresence initial={false}>
                {open && hasCaption && (
                  <motion.div
                    key="caption"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}>
                    {caption}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            hasCaption && (
              <StyledTextClip
                onClick={toggle}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
                animate={{ height: open || !collapsible ? 'auto' : STRIP_HEIGHT }}
                initial={false}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                $clamped={collapsible && !open}
                $clickable={collapsible}
                role={collapsible ? 'button' : undefined}
                aria-expanded={collapsible ? open : undefined}>
                <StyledCaption
                  ref={textRef}
                  className={lang}
                  dangerouslySetInnerHTML={createMarkup(detail.caption, lang)}
                />
                {collapsible && (
                  <StyledExpandBtn $open={open}>
                    <ChevronIcon />
                  </StyledExpandBtn>
                )}
              </StyledTextClip>
            )
          )}
        </StyledMedia>
      </StyledBody>
    </StyledDetail>
  )
}

// 前言／後記共用：中英兩欄，皆無資料則不顯示
function BilingualBlock({ zh, en, afterword }) {
  if (!zh && !en) return null
  return (
    <StyledIntro $afterword={afterword}>
      {zh && <StyledContentItems className="zh" dangerouslySetInnerHTML={createMarkup(zh, 'zh')} />}
      {en && (
        <StyledContentItems
          className="en"
          style={{ maxWidth: '80ch' }}
          dangerouslySetInnerHTML={createMarkup(en, 'en')}
        />
      )}
    </StyledIntro>
  )
}

export default function ArticleFieldTemplate({ data, spring }) {
  const headerData = {
    ...data,
    title: wrapTitle(data?.title),
    main_cover_image: stripAssetPrefix(data?.main_cover_image)
  }
  // 依後台 language 決定 timeline 內文（名稱、圖說）的中／英排版
  const lang = isEnglish(data) ? 'en' : 'zh'

  return (
    <>
      <ArticlesHeader data={headerData} slideTo={slideTo} spring={spring} hasChevron={false} />

      {/* 以 border 分隔 header 與 content */}
      <StyledSeperateFull />

      <StyledContent id="section2">
        {/* 前言：先中文（content_zh）後英文（content），沒有資料則不顯示 */}
        <BilingualBlock zh={data?.content_zh} en={data?.content} />

        {/* 行程 timeline */}
        {data?.timeline?.length > 0 && (
          <StyledTimeline>
            {data.timeline.map((section, i) => {
              const hasDetails = section.details?.length > 0
              return (
                <StyledSection key={`${section.time}-${i}`}>
                  <StyledTime>{section.time}</StyledTime>
                  <StyledGroup $hasDetails={hasDetails}>
                    {hasDetails && <StyledLineStartCircle />}
                    <StyledLocationBar>{section.location}</StyledLocationBar>

                    {section.details?.map((detail, j) => (
                      <TimelineDetail key={`${detail.name}-${j}`} detail={detail} lang={lang} />
                    ))}
                  </StyledGroup>
                </StyledSection>
              )
            })}
          </StyledTimeline>
        )}

        {/* 後記：旅程路線結束後、作者欄前；先中文（afterword_zh）後英文（afterword） */}
        <BilingualBlock zh={data?.afterword_zh} en={data?.afterword} afterword />
      </StyledContent>

      <StyledSeperateFull />

      {/* 作者：先中文（author_bio_zh）後英文（author_bio），沒有資料則不顯示 */}
      {(data?.author_bio_zh || data?.author_bio) && (
        <StyledAuthor>
          {data?.author_bio_zh && (
            <>
              <StyledAuthorHeading className="zh text-bold">作者</StyledAuthorHeading>
              <StyledContentSmItems
                className="author-bio zh"
                dangerouslySetInnerHTML={createMarkup(data.author_bio_zh, 'zh')}
              />
            </>
          )}
          {data?.author_bio && (
            <>
              <StyledAuthorHeading className="en text-bold">Author</StyledAuthorHeading>
              <StyledContentSmItems
                className="author-bio en"
                style={{ maxWidth: '80ch' }}
                dangerouslySetInnerHTML={createMarkup(data.author_bio, 'en')}
              />
            </>
          )}
        </StyledAuthor>
      )}
    </>
  )
}

const StyledContent = styled.div`
  position: relative;
  width: 100%;
  padding: 40px 20px 60px;

  font-family: 'Noto Serif TC', serif;
  font-weight: 200;
`

const StyledIntro = styled.div`
  max-width: 760px;
  margin: ${({ $afterword }) => ($afterword ? '60px auto 0' : '0 auto 50px')};
`

const StyledContentItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`

/* ------------------------------ Timeline ------------------------------ */

const StyledTimeline = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 0 4px;
`

const StyledSection = styled.div`
  position: relative;
`

const StyledTime = styled.div`
  margin: 26px 0 12px 2px;
  font-size: 0.95rem;
  font-family: var(--title-font-en, serif);
  color: #111;
`

/* 一個 time/location 群組：垂直金線與尾端箭頭都畫在這裡 */
const StyledGroup = styled.div`
  position: relative;

  ${({ $hasDetails }) =>
    $hasDetails &&
    css`
      /* 左側垂直金線 */
      &::before {
        content: '';
        position: absolute;
        left: 18px;
        top: 60px;
        bottom: 14px;
        width: 2px;
        background: ${GOLD};
      }
      /* 垂直線尾端的小箭頭（往下），連到下一組前線會中斷 */
      &::after {
        content: '';
        position: absolute;
        left: 14px;
        bottom: 6px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 9px solid ${GOLD};
      }
    `}
`

/* 垂直金線 start 處的圓點（對齊 ::before 線：left 18 + width 2 → 圓心 x19, top 60） */
const StyledLineStartCircle = styled.span`
  position: absolute;
  left: 14px;
  top: 55px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${GOLD};
`

const StyledLocationBar = styled.div`
  display: inline-block;
  margin-bottom: 28px;
  padding: 8px 18px;
  border-radius: 8px;
  background: #141414;
  color: ${GOLD};
  font-family: var(--title-font-en, serif), 'Noto Serif TC', serif;
  font-weight: 600;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.05rem;
  }
`

const StyledDetail = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 36px;
  }
`

/* 名稱＋媒體的容器：行動版單欄（名稱在上、圖片在下）；桌機維持雙欄 */
const StyledBody = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

/* 名稱列：行動版整列可點擊展開，右側為展開提示箭頭 */
const StyledNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}

  @media (min-width: 768px) {
    flex: 0 0 150px;
    width: 150px;
  }
`

/* 展開提示箭頭：僅行動版顯示，深色圓底按鈕；收合時呼吸閃爍、展開時旋轉朝上 */
const StyledNameChevron = styled.span`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-left: auto;
  border-radius: 50%;
  background: #141414;
  color: ${GOLD};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

  svg {
    transition: transform 0.3s ease;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }

  ${({ $open }) =>
    !$open &&
    css`
      animation: ${breathe} 1.8s ease-in-out infinite;
    `}

  @media (min-width: 768px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/* 彎曲虛線 + 圓點，固定寬度讓後面的 name 對齊 */
const StyledConnector = styled.div`
  flex: 0 0 64px;
  width: 64px;
  color: ${GOLD};
  transform: translateX(2px); 
  svg {
    display: block;
  }
`

/* 行動版：名稱填滿名稱列（右側留給提示箭頭）；桌機：由 StyledNameRow 固定 150px 對齊 */
const StyledName = styled.h3`
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  padding: 4px 8px 0 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: ${({ $lang }) =>
    $lang === 'en' ? 'var(--main-font-en, serif), var(--main-font-zh, serif)' : 'var(--main-font-zh, serif)'};
  line-height: 1.5;
  word-break: break-word;

  /* 可展開的名稱加底線，提示可點擊 */
  ${({ $clickable }) =>
    $clickable &&
    css`
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 5px;
    `}

  @media (min-width: 768px) {
    font-size: 1.05rem;
  }
`

const StyledMedia = styled.div`
  /* 行動版：名稱下方、滿版單欄；收合時完全隱藏（只剩名稱＋提示箭頭） */
  width: 100%;
  margin-top: 10px;
  ${({ $collapsible, $open }) =>
    $collapsible &&
    !$open &&
    css`
      display: none;
    `}

  @media (min-width: 768px) {
    /* 桌機：維持在名稱右側的第二欄，永遠顯示（收合時為預覽條） */
    display: block;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 480px;
    margin-top: 0;
  }
`

const StyledCaption = styled.div`
  &,
  p {
    font-size: 0.85rem !important;
    line-height: 1.6rem !important;
    color: #222;
    text-align: justify;
  }
`

/* 圖片剪裁容器：收合時只露出頂端 STRIP_HEIGHT 的細長預覽條，展開時 height 動畫到完整高度。
   由 framer-motion 控制 inline height，這裡負責裁切、游標與可點擊的視覺提示。 */
const StyledImageClip = styled(motion.div)`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  margin: 0 0 10px;
  border-radius: 3px;
  cursor: pointer;
  /* 圖片下方一點陰影 */
  box-shadow: 0 8px 14px -6px rgba(0, 0, 0, 0.28);

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* 收合狀態下方漸層，讓箭頭在任何圖上都清楚、並暗示可展開 */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0));
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover img {
    filter: brightness(1.04);
  }

  /* 行動版為完整堆疊圖片，不需要收合預覽條的漸層提示 */
  @media (max-width: 767px) {
    &::after {
      display: none;
    }
  }
`

/* 沒有圖片時的圖說剪裁容器：收合時只露出 STRIP_HEIGHT（與圖片預覽條同高），底部淡出 */
const StyledTextClip = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'auto')};

  ${StyledCaption} {
    ${({ $clamped }) =>
      $clamped &&
      css`
        -webkit-mask-image: linear-gradient(to bottom, #000 30%, transparent);
        mask-image: linear-gradient(to bottom, #000 30%, transparent);
      `}
  }

  /* 行動版收合時整個區塊由 StyledMedia 隱藏，展開後顯示全文，不需要箭頭鈕 */
  @media (max-width: 767px) {
    height: auto !important;
    ${StyledCaption} {
      -webkit-mask-image: none;
      mask-image: none;
    }
  }
`

/* 展開／收合的圓形箭頭鈕（收合朝下、且呼吸閃爍提示可展開；展開旋轉朝上、停止閃爍） */
const StyledExpandBtn = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #141414;
  color: ${GOLD};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  transition: background 0.2s ease;

  /* 箭頭方向由內部 svg 旋轉，讓外框可獨立做呼吸縮放動畫 */
  svg {
    transition: transform 0.3s ease;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }

  ${({ $open }) =>
    !$open &&
    css`
      animation: ${breathe} 1.8s ease-in-out infinite;
    `}

  ${StyledImageClip}:hover &,
  ${StyledTextClip}:hover & {
    background: ${GOLD};
    color: #141414;
    animation: none;
    transform: scale(1);
    opacity: 1;
  }

  /* 行動版改用名稱列的箭頭作為展開提示，圖片上不再疊按鈕 */
  @media (max-width: 767px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`


/* ------------------------------ Author -------------------------------- */

const StyledAuthor = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 10px 20px 70px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StyledAuthorHeading = styled.h2`
  font-size: 1.2rem;
  margin: 12px 0;
`

const StyledContentSmItems = styled.div`
  position: relative;
  width: 100%;
  margin: 0.5rem 0;
  padding-left: 2rem; /* 內容相對「作者」標題縮排 */
  text-align: justify;
`

const StyledSeperateFull = styled.div`
  width: 100%;
  margin: 0;
  border-bottom: 1px #df600050 solid;
`
