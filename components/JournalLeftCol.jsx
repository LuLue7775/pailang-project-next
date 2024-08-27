import styled from 'styled-components'
import { createMarkup } from '../utils/functions'

export default function JournalLeftCol({
  content,
  content_zh,
  comment,
  comment_zh,
  author_bio,
  author_bio_zh
}) {
  return (
    <StyledLeftColContainer className="left-col-content">
      {content && (
        <StyledContentItems
          className="en"
          dangerouslySetInnerHTML={content && createMarkup(content)}
        />
      )}

      {comment && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="en text-bold"> Notes </h2>
            <StyledContentSmItems
              className="en"
              dangerouslySetInnerHTML={comment && createMarkup(comment)}
            />
          </StyledWrap>
        </>
      )}

      {author_bio && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="en text-bold"> Author </h2>
            <StyledFooter
              className="author-bio en"
              dangerouslySetInnerHTML={author_bio && createMarkup(author_bio)}
            />
          </StyledWrap>
        </>
      )}

      {content_zh && (
        <>
          <StyledSeperateFull />
          <StyledContentItems
            className="zh"
            dangerouslySetInnerHTML={content_zh && createMarkup(content_zh)}
          />
        </>
      )}

      {comment_zh && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="zh text-bold"> 註解 </h2>
            <StyledContentSmItems
              className="zh"
              dangerouslySetInnerHTML={comment_zh && createMarkup(comment_zh)}
            />
          </StyledWrap>
        </>
      )}

      {author_bio_zh && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="zh text-bold"> 作者 </h2>
            <StyledFooter
              className="author-bio zh"
              dangerouslySetInnerHTML={author_bio_zh && createMarkup(author_bio_zh)}
            />
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
      width: 150%; /* Make the image wider on desktop */
      max-width: none; /* Override the max-width */
      transform: translateX(-17%); /* Center the wider image */
    }
  }

  iframe {
    min-height: 75dvh;
  }
`

const StyledSeperateFull = styled.div`
  width: 100%;
  margin: 20px 0;
  border-bottom: 1px #df600050 solid;
`

const StyledContentSmItems = styled.div`
  margin: 1rem auto;

  padding: 0 0 0 4rem;
`

const StyledFooter = styled.div`
  position: relative;
  margin: 1rem auto;
  padding: 0 0 0 4rem;
  text-align: justify;
  z-index: 5;
`
