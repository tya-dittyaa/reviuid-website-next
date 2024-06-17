import { FilmReviewValue } from "@/types";
import { createContext, useContext } from "react";

const UserFilmCommentContext = createContext<FilmReviewValue | null>(null);

const UserFilmCommentProvider: React.FC<{
  value: FilmReviewValue | null;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <UserFilmCommentContext.Provider value={value}>
      {children}
    </UserFilmCommentContext.Provider>
  );
};

const useUserFilmComment = () => {
  return useContext(UserFilmCommentContext);
};

export { UserFilmCommentProvider, useUserFilmComment };
