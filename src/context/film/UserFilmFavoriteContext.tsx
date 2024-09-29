import { createContext, useContext } from "react";

const UserFilmCommentContext = createContext<boolean | null>(null);

const UserFilmFavoriteProvider: React.FC<{
  value: boolean | null;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <UserFilmCommentContext.Provider value={value}>
      {children}
    </UserFilmCommentContext.Provider>
  );
};

const useUserFilmFavorite = () => {
  return useContext(UserFilmCommentContext);
};

export { UserFilmFavoriteProvider, useUserFilmFavorite };
