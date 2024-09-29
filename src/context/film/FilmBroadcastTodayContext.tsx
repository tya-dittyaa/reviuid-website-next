import { FilmData } from "@/types";
import { createContext, useContext } from "react";

const FilmBroadcastTodayContext = createContext<FilmData[] | null>(null);

const FilmBroadcastTodayProvider: React.FC<{
  film: FilmData[] | null;
  children: React.ReactNode;
}> = ({ film, children }) => {
  return (
    <FilmBroadcastTodayContext.Provider value={film}>
      {children}
    </FilmBroadcastTodayContext.Provider>
  );
};

const useFilmBroadcastToday = () => {
  return useContext(FilmBroadcastTodayContext);
};

export { FilmBroadcastTodayProvider, useFilmBroadcastToday };
