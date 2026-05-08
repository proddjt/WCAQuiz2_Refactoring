"use client";

import { createContext } from "react";

export type ScreenContextType = {
  isMdOrLess: boolean;
};

export const ScreenContext = createContext<ScreenContextType>({} as ScreenContextType);
