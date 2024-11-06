import styled from 'styled-components'
import { createMarkup } from '../utils/functions'

import dynamic from 'next/dynamic'

// Create a client-side only component
const ClientMediaContent = dynamic(
  () =>
    Promise.resolve(({ content }) => (
      <StyledContentItems
        className="zh"
        dangerouslySetInnerHTML={content && createMarkup(content, 'zh')}
      />
    )),
  { ssr: false }
)

export default function JournalLeftCol({
  content,
  content_zh,
  comment,
  comment_zh,
  author_bio,
  author_bio_zh,
  extra_media
}) {
  return (
    <StyledLeftColContainer className="left-col-content">
      {content && (
        <StyledContentItems
          className="en"
          style={{ maxWidth: '80ch' }}
          dangerouslySetInnerHTML={content && createMarkup(content, 'en')}
        />
      )}

      {comment && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="en text-bold"> Notes </h2>
            <StyledContentSmItems
              className="en comment"
              dangerouslySetInnerHTML={comment && createMarkup(comment, 'en')}
            />
          </StyledWrap>
        </>
      )}

      {author_bio && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="en text-bold"> Bio </h2>
            <StyledContentSmItems
              className="author-bio en"
              style={{ maxWidth: '80ch' }}
              dangerouslySetInnerHTML={author_bio && createMarkup(author_bio, 'en')}
            />
          </StyledWrap>
        </>
      )}

      {content_zh && (
        <>
          <StyledSeperateFull />
          <StyledContentItems
            className="zh"
            dangerouslySetInnerHTML={content_zh && createMarkup(content_zh, 'zh')}
          />
        </>
      )}

      {comment_zh && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="zh text-bold"> 註解 </h2>
            <StyledContentSmItems
              className="zh comment"
              dangerouslySetInnerHTML={comment_zh && createMarkup(comment_zh, 'zh')}
            />
          </StyledWrap>
        </>
      )}

      {author_bio_zh && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="zh text-bold"> 作者 </h2>
            <StyledContentSmItems
              className="author-bio zh"
              dangerouslySetInnerHTML={author_bio_zh && createMarkup(author_bio_zh, 'zh')}
            />
          </StyledWrap>
        </>
      )}

      {extra_media && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <ClientMediaContent content={extra_media} />
          </StyledWrap>
        </>
      )}
    </StyledLeftColContainer>
  )
}

const StyledWrap = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
`
const StyledLeftColContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #000;
  letter-spacing: 0.1rem;
  padding: 0 20px; /* Apply padding to the whole container */
  width: 100%; /* Ensure it respects the padding */
`

const StyledContentItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;

  img,
  iframe {
    display: block;
    margin: 0 auto;
    height: auto;
    width: 100%;

    @media (min-width: 768px) {
      width: 150%;
      max-width: 70vw;
      max-height: 50vw;
      object-fit: contain;
      position: relative;
      margin: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  iframe {
    min-height: 75dvh;
    width: 100vw;
  }

  video {
    max-width: 100%;
    height: auto;
  }
`

const StyledSeperateFull = styled.div`
  width: 100%;
  margin: 20px 0;
  border-bottom: 1px #df600050 solid;
`

const StyledContentSmItems = styled.div`
  position: relative;
  margin: 1rem auto;
  padding: 0 0 0 4rem;
  text-align: justify;
  z-index: 5;
  max-width: 100%;

  @media (min-width: 768px) {
    max-width: 80ch;
  }
`

