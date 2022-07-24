import ArticlesHeader from './ArticlesHeader'
import JournalContent from './JournalContent'
import { slideTo } from '../utils/functions'

export default function ArticleJorunalTemplate({ data, spring, setHoverEvent }) {
  return (
    <>
      <ArticlesHeader data={data} slideTo={slideTo} spring={spring} />
      <JournalContent data={data} spring={spring} setHoverEvent={setHoverEvent} />
    </>
  )
}
