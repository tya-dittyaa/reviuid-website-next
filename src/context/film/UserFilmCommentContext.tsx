import { FilmCommentValue } from "@/types";
import { createContext, useContext } from "react";

const UserCommentContext = createContext<FilmCommentValue | null>(null);

const UserFilmCommentProvider: React.FC<{
  value: FilmCommentValue | null;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <UserCommentContext.Provider value={value}>
      {children}
    </UserCommentContext.Provider>
  );
};

const useUserFilmComment = () => {
  return useContext(UserCommentContext);
};

export { UserFilmCommentProvider, useUserFilmComment };
