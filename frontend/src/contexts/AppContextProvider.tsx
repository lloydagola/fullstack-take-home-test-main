import React, { ReactNode, createContext } from "react";

export const AppContext = createContext(null);
export default function AppContextProvider({
  children,
  value,
}: {
  children: ReactNode[] | ReactNode;
  value: any;
}) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
