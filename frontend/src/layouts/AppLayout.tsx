import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

type TAppLayoutProps = {
  children: ReactNode[] | ReactNode;
};

export default function AppLayout({ children }: TAppLayoutProps): JSX.Element {
  return <Box component="main">{children}</Box>;
}
