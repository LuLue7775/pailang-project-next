import { useRef, useContext } from 'react'
import { EllipseBtnSVG } from './Svgs'
import { createMarkup } from '../utils/functions'
import { CursorContext } from '../context/cursorContext'
import styled from 'styled-components'

export default function ModalStart({ handleStartClick, modalData }) {
  const { setHoverEvent } = useContext(CursorContext)
  const modalRef = useRef()
  const { title, title_zh, content, content_zh } = modalData || {}

  return (
    <StyledModal className="modal" ref={modalRef}>
      {/* 中文區塊：titleZh + contentZh */}
      <StyledSection>
        <StyledChTitle className="font-zh-sans"> {title_zh} </StyledChTitle>
        <StyledModalContent>
          <div className="zh" dangerouslySetInnerHTML={content_zh && createMarkup(content_zh, 'zh')} />
        </StyledModalContent>
      </StyledSection>

      {/* 英文區塊：title + content */}
      <StyledSection>
        <StyledEnTitle> {title} </StyledEnTitle>
        <StyledModalContent>
          <div className="en" dangerouslySetInnerHTML={content && createMarkup(content, 'en')} />
        </StyledModalContent>
      </StyledSection>

      <div
        onClick={handleStartClick}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}>
        <EllipseBtnSVG texts={'Start'} />
      </div>
    </StyledModal>
  )
}

const StyledModal = styled.div`
  width: min(700px, 90vw);
  margin: auto;
  padding: 40px min(6vw, 48px);
  border-radius: 20px;
  border: 1px solid var(--main-color, #ffc93c);
  background-color: transparent;
  color: var(--main-color, #ffc93c);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.4rem;
  text-align: justify;
`
const StyledSection = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 24px;
`
const StyledChTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 15px;
`
const StyledEnTitle = styled.h3`
  font-family: var(--title-font-en, serif);
  font-size: 2rem;
  text-align: center;
  padding: 15px;
`
const StyledModalContent = styled.div`
  margin: 0 auto;
  overflow: hidden;

  /* 行高與段落樣式對齊 article-journal（沿用 globals.css 的 div.en p / div.zh p） */
  .zh > p,
  .en > p {
    max-width: none;
    text-align: center;
  }
`
