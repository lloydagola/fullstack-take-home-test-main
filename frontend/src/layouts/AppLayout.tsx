import React, { ReactNode } from "react";

type TAppLayoutProps = {
  children: ReactNode[] | ReactNode;
};

export default function AppLayout({ children }: TAppLayoutProps): JSX.Element {
  return <>{children}</>;
}
