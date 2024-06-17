import { createContext, useContext } from "react";

const UserFilmWatchlistContext = createContext<boolean | null>(null);

const UserFilmWatchlistProvider: React.FC<{
  value: boolean | null;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <UserFilmWatchlistContext.Provider value={value}>
      {children}
    </UserFilmWatchlistContext.Provider>
  );
};

const useUserFilmWatchlist = () => {
  return useContext(UserFilmWatchlistContext);
};

export { UserFilmWatchlistProvider, useUserFilmWatchlist };
