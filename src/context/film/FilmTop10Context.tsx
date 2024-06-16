import { FilmData } from "@/types";
import { createContext, useContext } from "react";

const FilmTop10Context = createContext<FilmData[] | null>(null);

const FilmTop10Provider: React.FC<{
  film: FilmData[] | null;
  children: React.ReactNode;
}> = ({ film, children }) => {
  return (
    <FilmTop10Context.Provider value={film}>
      {children}
    </FilmTop10Context.Provider>
  );
};

const useFilmTop10 = () => {
  return useContext(FilmTop10Context);
};

export { FilmTop10Provider, useFilmTop10 };
