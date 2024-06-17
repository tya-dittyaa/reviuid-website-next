import { FilmData } from "@/types";
import { createContext, useContext } from "react";

const FilmContext = createContext<FilmData | undefined>(undefined);

const FilmDataProvider: React.FC<{
  film: FilmData;
  children: React.ReactNode;
}> = ({ film, children }) => {
  return <FilmContext.Provider value={film}>{children}</FilmContext.Provider>;
};

const useFilmData = () => {
  return useContext(FilmContext);
};

export { FilmDataProvider, useFilmData };
