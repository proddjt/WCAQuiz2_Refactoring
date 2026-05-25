import { useRef } from "react"

export default function useSectionRefs(){
  const refs = useRef({} as Record<number, HTMLElement | null>);
  
  const assignRef = (indexes: number[]) => (el: HTMLElement | null) => {
    indexes.forEach(i => {
      refs.current[i] = el;
    });
  };

  return {refs, assignRef}
}