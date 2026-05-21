import useModals from "@/components/layout/hooks/useModals";
import useTimer from "@/components/layout/hooks/useTimer";
import { getComp, GoldrushComp } from "@/data/goldrush";
import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useGoldRush(mode?: "ez" | "md" | "hd") {
  const [comp, setComp] = useState<GoldrushComp | null>(null);
  const [guessedEvents, setGuessedEvents] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPending, startTransition] = useTransition()
  const {errorModal, endModal} = useModals();
  const {stop, startWithTime, timer} = useTimer(0)
  const {t} = useTranslation();

  const startGame = () => {
    setAttempts(0);
    if (!mode) return
    startTransition(async () => {
      const {comp, error} = await getComp(mode);
      if (error) return errorModal();
      setComp(comp);
      startWithTime(comp?.time || 360);
    });
  }

  const startNew = () => {
    setGuessedEvents([]);
    setGameOver(false);
    startGame();
  }

  const revealAnswer = () => {
    if (gameOver) return
    setAttempts(4);
    setGameOver(true);
    stop();
    endModal(t("lose_modal_title"), t("goldrush_lose_modal_desc", {number: comp?.podiums?.length || 0 - guessedEvents.length}));
  }

  const init = useEffectEvent(() => setTimeout(() => startGame(), 0));
      
  useEffect(() => {
      init();
  }, [mode]);

  return {isPending, comp, guessedEvents, gameOver, startNew, revealAnswer, timer};
}