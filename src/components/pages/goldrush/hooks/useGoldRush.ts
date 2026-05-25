'use client'

import useModals from "@/components/layout/hooks/useModals";
import useSectionRefs from "@/components/layout/hooks/useSectionRefs";
import useTimer from "@/components/layout/hooks/useTimer";
import useGoldrushGuessedEvents from "@/context/GoldrushGuessedEvents/useGoldrushGuessedEvents";
import { eventMap } from "@/data/eventMap";
import { getComp, GoldrushComp } from "@/data/goldrush";
import { checkPercentage, preferredOrder } from "@/utils/functions";
import { showAlert, showConfirm } from "@/utils/notifications";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useEffectEvent, useMemo, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useGoldRush(mode?: "ez" | "md" | "hd") {
  const [comp, setComp] = useState<GoldrushComp | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const tableRef = useRef<AgGridReact>({} as AgGridReact);

  const [isPending, startTransition] = useTransition()
  const {errorModal, endModal, goldrushAnswerModal} = useModals();
  const {stop, startWithTime, timer} = useTimer(0)
  const {t} = useTranslation();
  const {guessedEvents, resetEvents, addEvent} = useGoldrushGuessedEvents();
  const {refs, assignRef} = useSectionRefs();

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
        const eventName = eventMap.get(event) || ""
        if (comp?.events.length !== guessedEvents.length + 1) showConfirm(t("goldrush_correct_answer", {person: correct.name, event: eventName}))
        addEvent(event);
        resolve(true)
      }
      resolve(false)
    });
  }, [comp, addEvent, t, guessedEvents.length]);

  const skipAnswer = () => {
    if (attempts === 3) {
      revealAnswer();
      return
    }
    startWithTime(calculateTime(attempts + 1));
  }

  const calculateTime = (number: number) => {
    if (!comp?.time) return 0
    return Math.floor(comp.time -(comp.time * (number === 1 ? 0.4 : number === 2 ? 0.5 : 0.7)))
  }

  const nextHint = (number: number) => {
    setAttempts(number);
    showAlert(t("goldrush_skip", {perc: number === 1 ? 40 : number === 2 ? 50 : 70}));
    const target = refs.current[number];
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    if (number === 1 || number === 3) tableRef.current.api.ensureColumnVisible(number === 1 ? "third.name" : "second.name", "middle")
  }

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

  const endGame = useEffectEvent(() => {
    if (comp?.events.length === guessedEvents.length){
      setTimeout(() => {
        setGameOver(true)
        stop();
        endModal(t("win_modal_title"), t("goldrush_win_modal_desc", {number: timer}));
      }, 0);
    }
  }) 

  useEffect(() => {
    endGame()
  }, [guessedEvents.length])

  const checkTime = useEffectEvent(() => {
    if (comp?.time){
      if (attempts === 0 && checkPercentage(comp.time, comp.time - timer, 40)) setTimeout(() => nextHint(1), 0);
      if (attempts === 1 && checkPercentage(comp.time, comp.time - timer, 50)) setTimeout(() => nextHint(2), 0);
      if (attempts === 2 && checkPercentage(comp.time, comp.time - timer, 70)) setTimeout(() => nextHint(3), 0);
      if (timer === 0 && !gameOver) setTimeout(() => revealAnswer(), 0);
    }
  });

  const getOrderedEvents = () => {
    const orderMap = Object.fromEntries(
      preferredOrder.map((ev, i) => [ev, i])
    );

    if (!comp?.podiums) return [];

    return comp?.podiums.sort((a, b) => {
      const aIndex = orderMap[a.event] ?? Infinity;
      const bIndex = orderMap[b.event] ?? Infinity;
      return aIndex - bIndex;
    });
  }

  useEffect(() => {
    checkTime();
  }, [timer])

  return {isPending, comp, gameOver, startNew, revealAnswer, timer, attempts, tableContext, tableRef, skipAnswer, getOrderedEvents, assignRef};
}