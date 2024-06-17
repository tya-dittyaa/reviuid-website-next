import { createContext, useContext } from "react";

const FilmContext = createContext<number>(0);

const FilmTotalProvider: React.FC<{
  total: number;
  children: React.ReactNode;
}> = ({ total, children }) => {
  return <FilmContext.Provider value={total}>{children}</FilmContext.Provider>;
};

const useFilmTotal = () => {
  return useContext(FilmContext);
};

export { FilmTotalProvider, useFilmTotal };
