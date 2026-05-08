import { useContext } from "react";
import { ScreenContext } from "./ScreenContext";

export default function useScreen() {
  return useContext(ScreenContext);
}
