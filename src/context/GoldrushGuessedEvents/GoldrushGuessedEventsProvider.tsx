"use client";

import { useState, type ReactNode } from "react";
import { GoldrushGuessedEventsContext } from "./GoldrushGuessedEventsContext";

export function GoldrushGuessedEventsProvider({ children }: { children: ReactNode }) {
  const [guessedEvents, setGuessedEvents] = useState<string[]>([]);

  const addEvent = (event: string) => setGuessedEvents(prev => ([...prev, event]));
  const resetEvents = () => setGuessedEvents([]);

  return <GoldrushGuessedEventsContext.Provider value={{ guessedEvents, addEvent, resetEvents }}>{children}</GoldrushGuessedEventsContext.Provider>;
}
