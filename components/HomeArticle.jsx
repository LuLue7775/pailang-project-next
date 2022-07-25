import React from 'react'
import ArticleJournalTemplate from './ArticleJournalTemplate'
import ArticleScenographyTemplate from './ArticleScenographyTemplate'
import ArticleVideoTemplate from './ArticleVideoTemplate'

export default function HomeArticle({ randomArticleData, spring, setHoverEvent }) {
  return (
    <>
    { randomArticleData?.type === 'journal' 
        ?  <ArticleJournalTemplate data={randomArticleData?.data} spring={spring} setHoverEvent={setHoverEvent} />
        : randomArticleData?.type === 'scenography' 
            ? <ArticleScenographyTemplate data={randomArticleData?.data} spring={spring} setHoverEvent={setHoverEvent} />
            : <ArticleVideoTemplate data={randomArticleData?.data} spring={spring} setHoverEvent={setHoverEvent} />
    }
    </>
  )
}
