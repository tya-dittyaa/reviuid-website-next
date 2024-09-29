import { ViewType } from "@/types";
import { createContext, useContext } from "react";

const ViewLayoutContext = createContext<ViewType>("horizontal");

const ViewLayoutProvider: React.FC<{
  view: ViewType;
  children: React.ReactNode;
}> = ({ view, children }) => {
  return (
    <ViewLayoutContext.Provider value={view}>
      {children}
    </ViewLayoutContext.Provider>
  );
};

const useViewLayout = () => {
  return useContext(ViewLayoutContext);
};

export { ViewLayoutProvider, useViewLayout };
