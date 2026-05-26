import useModals from "@/components/layout/hooks/useModals";
import useSectionRefs from "@/components/layout/hooks/useSectionRefs";
import useTimer from "@/components/layout/hooks/useTimer";
import { getPerson, RevealPerson } from "@/data/reveal";
import { showAlert, showError } from "@/utils/notifications";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useEffectEvent, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useReveal(mode: string, difficulty: string) {
  const [person, setPerson] = useState<RevealPerson | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const tableRef = useRef<AgGridReact>({} as AgGridReact);

  const [isPending, startTransition] = useTransition();
  const { errorModal, endModal } = useModals();
  const { start, stop, reset, timer, isTimeOver, resetAndStart } = useTimer(90);
  const { t } = useTranslation();
  const { refs, assignRef } = useSectionRefs();

  const revealAnswer = () => {
    if (gameOver) return;
    setAttempts(10);
    setGameOver(true);
    stop();
    endModal(t("lose_modal_title"), t("lose_modal_desc", { person: person?.name }));
  };

  const startNew = () => {
    reset();
    setAttempts(0);
    setGameOver(false);
    startGame();
  };

  const checkAnswer = (answer: string) => {
    if (answer === person?.id) {
      setGameOver(true);
      stop();
      endModal(t("win_modal_title"), t("win_modal_desc", { person: person?.name, points: 10 - attempts }));
    } else {
      scrollToSection(attempts + 1);
      setAttempts(attempts + 1);
      showError(t("wrong_alert_desc"), t("wrong_alert_heading"));
      resetAndStart();
    }
  };

  const startGame = () => {
    if (!mode || !difficulty) return;
    startTransition(async () => {
      const { person, error } = await getPerson(mode, difficulty);
      if (error) {
        return errorModal();
      }
      setPerson(person);
      start();
    });
  };

  const skipAnswer = () => {
    if (attempts === 9) {
      revealAnswer();
      return;
    }
    scrollToSection(attempts + 1);
    setAttempts(attempts + 1);
    resetAndStart();
    showAlert(t("skip_alert_desc"), t("skip_alert_heading"));
  };

  const timeOver = () => {
    if (attempts === 9) revealAnswer();
    else skipAnswer();
  };

  const scrollToSection = (number: number) => {
    const target = refs.current[number];
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    if (number === 5 || number === 8 || number === 9)
    tableRef.current.api.ensureColumnVisible(
        number === 5 ? "event_name" : number === 8 ? "single.best" : "average.best",
        "middle",
    );
  }

  const init = useEffectEvent(() => startGame());

  useEffect(() => {
    init();
  }, [mode]);

  const onTimeOver = useEffectEvent(() => setTimeout(() => timeOver(), 10));

  useEffect(() => {
    if (isTimeOver) onTimeOver();
  }, [isTimeOver]);

  return {
    attempts,
    gameOver,
    startNew,
    checkAnswer,
    timer,
    isTimeOver,
    isPending,
    person,
    revealAnswer,
    setAttempts,
    skipAnswer,
    assignRef,
    tableRef,
  };
}
