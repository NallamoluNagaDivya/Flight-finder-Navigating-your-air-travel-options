import React, { createContext, useState } from 'react';

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [user, setUser] = useState(null);            // user object / null
  const [loading, setLoading] = useState(false);     // global loader
  return (
    <GeneralContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </GeneralContext.Provider>
  );
};
