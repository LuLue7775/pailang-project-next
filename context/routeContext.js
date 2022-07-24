import { createContext, useState } from 'react'

export const RouteContext = createContext(['', () => {}])

const RouteProvider = ({ children }) => {
  const [currentTitle, setCurrentTitle] = useState()

  return (
    <RouteContext.Provider value={[currentTitle, setCurrentTitle]}>
      {children}
    </RouteContext.Provider>
  )
}

export default RouteProvider
