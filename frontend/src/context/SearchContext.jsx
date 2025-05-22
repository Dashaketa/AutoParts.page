import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  return (
    <SearchContext.Provider value={{ terminoBusqueda, setTerminoBusqueda }}>
      {children}
    </SearchContext.Provider>
  );
};
