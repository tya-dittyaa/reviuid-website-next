import { createContext, useContext } from "react";

const ForumChildTotalContext = createContext<number>(0);

const ForumChildTotalProvider: React.FC<{
  total: number;
  children: React.ReactNode;
}> = ({ total, children }) => {
  return (
    <ForumChildTotalContext.Provider value={total}>
      {children}
    </ForumChildTotalContext.Provider>
  );
};

const useForumChildTotal = () => {
  return useContext(ForumChildTotalContext);
};

export { ForumChildTotalProvider, useForumChildTotal };
