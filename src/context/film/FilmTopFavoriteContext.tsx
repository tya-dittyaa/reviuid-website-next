import { FilmData } from "@/types";
import { createContext, useContext } from "react";

const FilmTopFavoriteContext = createContext<FilmData[] | null>(null);

const FilmTopFavoriteProvider: React.FC<{
  film: FilmData[] | null;
  children: React.ReactNode;
}> = ({ film, children }) => {
  return (
    <FilmTopFavoriteContext.Provider value={film}>
      {children}
    </FilmTopFavoriteContext.Provider>
  );
};

const useFilmTopFavorite = () => {
  return useContext(FilmTopFavoriteContext);
};

export { FilmTopFavoriteProvider, useFilmTopFavorite };
