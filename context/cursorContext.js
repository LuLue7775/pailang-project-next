import { createContext, useState } from "react";

export const CursorContext = createContext([
    'default',
    () => {}
]);

const CursorProvider = ({ children }) => {
    const [hoverEvent, setHoverEvent] = useState("default")

    const value = { hoverEvent, setHoverEvent }
    return (
      <CursorContext.Provider value={value}>
        {children}
      </CursorContext.Provider>
    );
  };

export default CursorProvider;