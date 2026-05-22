import { useContext } from "react";
import { GoldrushGuessedEventsContext } from "./GoldrushGuessedEventsContext";

export default function useGoldrushGuessedEvents() {
  return useContext(GoldrushGuessedEventsContext);
}
