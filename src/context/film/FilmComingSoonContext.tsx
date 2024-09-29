import { FilmData } from "@/types";
import { createContext, useContext } from "react";

const FilmComingSoonContext = createContext<FilmData[] | null>(null);

const FilmComingSoonProvider: React.FC<{
  film: FilmData[] | null;
  children: React.ReactNode;
}> = ({ film, children }) => {
  return (
    <FilmComingSoonContext.Provider value={film}>
      {children}
    </FilmComingSoonContext.Provider>
  );
};

const useFilmComingSoon = () => {
  return useContext(FilmComingSoonContext);
};

export { FilmComingSoonProvider, useFilmComingSoon };
