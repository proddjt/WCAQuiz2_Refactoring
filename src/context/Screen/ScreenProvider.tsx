"use client";

import { type ReactNode } from "react";
import { ScreenContext } from "./ScreenContext";
import { useMediaQuery } from "@mantine/hooks";

export function ScreenProvider({ children }: { children: ReactNode }) {
  const isMdOrLess = useMediaQuery(`(max-width: 62em)`);

  return <ScreenContext.Provider value={{ isMdOrLess }}>{children}</ScreenContext.Provider>;
}
