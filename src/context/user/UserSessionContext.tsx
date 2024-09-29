import { UserSession } from "@/types";
import { createContext, useContext } from "react";

const UserContext = createContext<UserSession | null>(null);

const UserSessionProvider: React.FC<{
  user: UserSession | null;
  children: React.ReactNode;
}> = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUserSession = () => {
  return useContext(UserContext);
};

export { UserSessionProvider, useUserSession };
