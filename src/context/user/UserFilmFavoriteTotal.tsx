import { createContext, useContext } from "react";

const UserFilmFavoriteTotalContext = createContext<number>(0);

const UserFilmFavoriteTotalProvider: React.FC<{
  total: number;
  children: React.ReactNode;
}> = ({ total, children }) => {
  return (
    <UserFilmFavoriteTotalContext.Provider value={total}>
      {children}
    </UserFilmFavoriteTotalContext.Provider>
  );
};

const useUserFilmFavoriteTotal = () => {
  return useContext(UserFilmFavoriteTotalContext);
};

export { UserFilmFavoriteTotalProvider, useUserFilmFavoriteTotal };
