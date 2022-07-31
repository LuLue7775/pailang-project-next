import ArticlesHeader from './ArticlesHeader'
import NodesContainer from './NodesContainer'
import { UpChevronSVG } from './Svgs'
import { slideTo } from '../utils/functions'

import styled from 'styled-components'

export default function ArticleScenographyTemplate({ data, spring, setHoverEvent }) {
  return (
    <>
      <ArticlesHeader data={data} slideTo={slideTo} spring={spring} />

      <StyledChevron
        onClick={() => slideTo(0, spring)}
        onMouseOver={() => setHoverEvent('expand')}
        onMouseLeave={() => setHoverEvent('default')}
      >
        <UpChevronSVG />
      </StyledChevron>

      <NodesContainer data={data} slideTo={slideTo} />
    </>
  )
}

const StyledChevron = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`
