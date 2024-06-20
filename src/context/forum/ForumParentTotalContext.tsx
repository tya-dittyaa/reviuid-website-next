import { createContext, useContext } from "react";

const ForumParentTotalContext = createContext<number>(0);

const ForumParentTotalProvider: React.FC<{
  total: number;
  children: React.ReactNode;
}> = ({ total, children }) => {
  return (
    <ForumParentTotalContext.Provider value={total}>
      {children}
    </ForumParentTotalContext.Provider>
  );
};

const useForumParentTotal = () => {
  return useContext(ForumParentTotalContext);
};

export { ForumParentTotalProvider, useForumParentTotal };
