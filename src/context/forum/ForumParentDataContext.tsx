import { ForumParentData } from "@/types";
import { createContext, useContext } from "react";

const ForumParentDataContext = createContext<ForumParentData | undefined>(
  undefined
);

const ForumParentDataProvider: React.FC<{
  forumParent: ForumParentData;
  children: React.ReactNode;
}> = ({ forumParent, children }) => {
  return (
    <ForumParentDataContext.Provider value={forumParent}>
      {children}
    </ForumParentDataContext.Provider>
  );
};

const useForumParentData = () => {
  return useContext(ForumParentDataContext);
};

export { ForumParentDataProvider, useForumParentData };
