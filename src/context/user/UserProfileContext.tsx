import { UserProfile } from "@/types";
import { createContext, useContext } from "react";

const UserContext = createContext<UserProfile | null>(null);

const UserProfileProvider: React.FC<{
  user: UserProfile | null;
  children: React.ReactNode;
}> = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUserProfile = () => {
  return useContext(UserContext);
};

export { UserProfileProvider, useUserProfile };
