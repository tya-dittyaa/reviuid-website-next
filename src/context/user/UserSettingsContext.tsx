import { UserSettings } from "@/types";
import { createContext, useContext } from "react";

const UserContext = createContext<UserSettings | null>(null);

const UserSettingsProvider: React.FC<{
  user: UserSettings | null;
  children: React.ReactNode;
}> = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUserSettings = () => {
  return useContext(UserContext);
};

export { UserSettingsProvider, useUserSettings };
