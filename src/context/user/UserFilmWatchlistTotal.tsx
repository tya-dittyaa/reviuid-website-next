import { createContext, useContext } from "react";

const UserFilmWatchlistTotalContext = createContext<number>(0);

const UserFilmWatchlistTotalProvider: React.FC<{
  total: number;
  children: React.ReactNode;
}> = ({ total, children }) => {
  return (
    <UserFilmWatchlistTotalContext.Provider value={total}>
      {children}
    </UserFilmWatchlistTotalContext.Provider>
  );
};

const useUserFilmWatchlistTotal = () => {
  return useContext(UserFilmWatchlistTotalContext);
};

export { UserFilmWatchlistTotalProvider, useUserFilmWatchlistTotal };
