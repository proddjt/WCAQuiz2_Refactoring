'use client'

import useModals from "@/components/layout/hooks/useModals";
import useTimer from "@/components/layout/hooks/useTimer";
import useGoldrushGuessedEvents from "@/context/GoldrushGuessedEvents/useGoldrushGuessedEvents";
import { eventMap } from "@/data/eventMap";
import { getComp, GoldrushComp } from "@/data/goldrush";
import { showConfirm } from "@/utils/notifications";
import { useCallback, useEffect, useEffectEvent, useMemo, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useGoldRush(mode?: "ez" | "md" | "hd") {
  const [comp, setComp] = useState<GoldrushComp | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPending, startTransition] = useTransition()
  const {errorModal, endModal, goldrushAnswerModal} = useModals();
  const {stop, startWithTime, timer} = useTimer(0)
  const {t} = useTranslation();
  const {guessedEvents, resetEvents, addEvent} = useGoldrushGuessedEvents();

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
    resetEvents();
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

  const checkAnswer = useCallback(async (event: string, answer: string) => {
    return new Promise(resolve => {
      const correct = comp?.podiums?.find(p => p.event === event)?.first;
      if (correct?.id === answer){
        addEvent(event);
        const eventName = eventMap.get(event) || ""
        showConfirm(t("goldrush_correct_answer", {person: correct.name, event: eventName}))
        resolve(true)
      }
      resolve(false)
    });
  }, [comp, addEvent, t])

  const tableContext = useMemo(() => ({
    insertAnswer: (event: string) => {
      if (guessedEvents.includes(event)) return
      goldrushAnswerModal(event, (v: string) => checkAnswer(event, v));
    }
  }), [guessedEvents, goldrushAnswerModal, checkAnswer])

  const init = useEffectEvent(() => setTimeout(() => startGame(), 0));
      
  useEffect(() => {
    init();
  }, [mode]);

  const checkTime = useEffectEvent(() => {
    if (timer === 0) setTimeout(() => revealAnswer(), 0);
    if (attempts === 0 && )
  });

  useEffect(() => {
    checkTime();
  }, [timer])

  return {isPending, comp, gameOver, startNew, revealAnswer, timer, attempts, tableContext};
}