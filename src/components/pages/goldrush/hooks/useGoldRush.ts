import useModals from "@/components/layout/hooks/useModals";
import { getComp, GoldrushComp } from "@/data/goldrush";
import { useEffect, useEffectEvent, useState, useTransition } from "react";

export default function useGoldRush(mode?: "ez" | "md" | "hd") {
  const [comp, setComp] = useState<GoldrushComp | null>(null);
  const [guessedEvents, setGuessedEvents] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isPending, startTransition] = useTransition()
  const {errorModal} = useModals();

  const startGame = () => {
    if (!mode) return
    startTransition(async () => {
      const {comp, error} = await getComp(mode);
      if (error) return errorModal();
      setComp(comp);
    });
  }

  const startNew = () => {
    setGuessedEvents([]);
    setGameOver(false);
    startGame();
  }

  const init = useEffectEvent(() => startGame());
      
  useEffect(() => {
      init();
  }, [mode]);

  return {isPending, comp, guessedEvents, gameOver, startNew};
}