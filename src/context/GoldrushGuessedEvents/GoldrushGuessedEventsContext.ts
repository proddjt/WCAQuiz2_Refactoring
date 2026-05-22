"use client";

import { createContext } from "react";

export type GoldrushGuessedEventsContextType = {
  guessedEvents: string[];
  addEvent: (event: string) => void;
  resetEvents: () => void;
};

export const GoldrushGuessedEventsContext = createContext<GoldrushGuessedEventsContextType>({} as GoldrushGuessedEventsContextType);
