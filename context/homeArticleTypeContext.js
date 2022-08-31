import { createContext, useState } from 'react'

export const HomeArticleTypeContext = createContext(['', () => {}])

const HomeArticleTypeProvider = ({ children }) => {
  const [currentArticle, setCurrentArticle] = useState()

  const value = { currentArticle, setCurrentArticle }
  return <HomeArticleTypeContext.Provider value={value}>{children}</HomeArticleTypeContext.Provider>
}

export default HomeArticleTypeProvider
