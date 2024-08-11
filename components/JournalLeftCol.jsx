import styled from 'styled-components'
import { createMarkup } from '../utils/functions'

export default function JournalLeftCol({ content, content_zh, comment, comment_zh, author_bio }) {
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
            <h2 className="en"> Notes </h2>
            <StyledContentSmItems dangerouslySetInnerHTML={comment && createMarkup(comment)} />
          </StyledWrap>
        </>
      )}

      {author_bio && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="en"> Author </h2>
            <StyledFooter
              className="author-bio"
              dangerouslySetInnerHTML={author_bio && createMarkup(author_bio)}
            />
          </StyledWrap>
        </>
      )}

      {content_zh && (
        <>
          <StyledSeperateFull />
          <StyledContentItems dangerouslySetInnerHTML={content_zh && createMarkup(content_zh)} />
        </>
      )}

      {comment_zh && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="zh"> 註解 </h2>
            <StyledContentSmItems
              dangerouslySetInnerHTML={comment_zh && createMarkup(comment_zh)}
            />
          </StyledWrap>
        </>
      )}

      {author_bio && (
        <>
          <StyledSeperateFull />
          <StyledWrap>
            <h2 className="zh"> 作者 </h2>
            <StyledFooter
              className="author-bio"
              dangerouslySetInnerHTML={author_bio && createMarkup(author_bio)}
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
  max-width: 70ch;
  width: 100%;
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
  font-size: 0.8rem;
  padding: 20px 0;
  margin: 1rem auto;
  max-width: 70ch;
  width: 100%;
  padding: 0 1rem;
`

const StyledFooter = styled.div`
  position: relative;
  max-width: 70ch;
  width: 100%;
  margin: 1rem auto;
  padding: 0 1rem;
  text-align: justify;
  z-index: 5;
`
