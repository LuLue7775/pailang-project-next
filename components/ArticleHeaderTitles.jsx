import { useRef } from 'react'
import { useWindowSize } from '../utils/hooks'
import { createMarkup } from '../utils/functions'
import { subtitles } from '../utils/framerVariantsHeader'
import AnimatedTitles from './ArticleTitleAnimation'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export default function ArticleHeaderTitles({ title, title_zh }) {
  const titleRef = useRef(title?.length > 60 ? true : false)
  const { windowWidth } = useWindowSize()

  // 是否有英文標題（去掉標籤後仍有文字）。沒有英文標題時，
  // 讓中文標題升級為主標題大小，避免只剩下細小的副標題、看起來不像標題。
  const hasEnTitle = !!title && title.replace(/<[^>]*>/g, '').trim().length > 0

  return (
    <StyledTitles>
      {hasEnTitle && (
        <div>
          <AnimatedTitles
            title={title}
            language={'en'}
            textLengthRef={titleRef}
            windowWidth={windowWidth}
          />
        </div>
      )}

      {title_zh &&
        (hasEnTitle ? (
          <StyledZhTitles
            as={motion.div}
            variants={subtitles}
            initial="initial"
            animate="animate"
            dangerouslySetInnerHTML={createMarkup(title_zh)}
          />
        ) : (
          <StyledZhMainTitle
            as={motion.div}
            variants={subtitles}
            initial="initial"
            animate="animate"
            dangerouslySetInnerHTML={createMarkup(title_zh)}
          />
        ))}
    </StyledTitles>
  )
}


const StyledTitles = styled.div`
  width: 100%;
  height: max-content;
  text-align: center;
  overflow: hidden;
`
const StyledZhTitles = styled(motion.div)`
  font-size: 1.3rem;
  p,
  span {
    font-size: 1.3rem;
    padding: 0 2rem;
  }
`

/* 只有中文標題時：升級為主標題大小（Noto Serif TC 600），與英文大標題同一層級 */
const StyledZhMainTitle = styled(motion.div)`
  font-family: var(--title-font-zh, 'Noto Serif TC'), serif;
  p,
  span {
    font-family: var(--title-font-zh, 'Noto Serif TC'), serif;
    font-weight: 600;
    font-size: clamp(30px, 6vw, 46px);
    line-height: 1.35;
    letter-spacing: 2px;
    padding: 0 1rem;
  }
`
