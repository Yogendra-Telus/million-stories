import React, { useState } from 'react';

export const HeaderContext = React.createContext();

const HeaderProvider = ({ children }) => {
  const [hideHeader, setHideHeader] = useState(false);

  return <HeaderContext.Provider value={{ hideHeader, setHideHeader }}> {children} </HeaderContext.Provider>;
};

export default HeaderProvider;
