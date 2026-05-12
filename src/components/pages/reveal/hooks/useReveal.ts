import useModals from "@/components/layout/hooks/useModals";
import useTimer from "@/components/layout/hooks/useTimer";
import { getPerson, RevealPerson } from "@/data/reveal";
import { showAlert, showError } from "@/utils/notifications";
import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useReveal(mode: string, difficulty: string){
    const [person, setPerson] = useState<RevealPerson | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const [isPending, startTransition] = useTransition();
    const {errorModal, endModal} = useModals();
    const {start, stop, reset, timer, isTimeOver} = useTimer(90);
    const {t} = useTranslation();

    const revealAnswer = () => {
        if (gameOver) return
        setAttempts(10);
        setGameOver(true);
        stop();
        endModal(t("lose_modal_title"), t("lose_modal_desc", {person: person?.name}));
    }

    const startNew = () => {
        reset();
        setAttempts(0);
        setGameOver(false);
        startGame();
    }

    const checkAnswer = (answer: string) => {
        if (answer === person?.id) {
            setGameOver(true);
            stop();
            endModal(t("win_modal_title"), t("win_modal_desc", {person: person?.name, points: 5 - attempts}));
        } else {
            setAttempts(attempts + 1);
            showError(t("wrong_alert_desc"), t("wrong_alert_heading"))
        }
    }

    const startGame = () => {
        if (!mode || !difficulty) return
        startTransition(async () => {
            const {person, error} = await getPerson(mode, difficulty);
            if (error) {
                return errorModal();
            }
            setPerson(person);
            start();
        });
    }

    const skipAnswer = () => {
        setAttempts(attempts + 1);
        reset();
        showAlert(t("skip_alert_desc"), t("skip_alert_heading"));
        start();
    }

    const timeOver = () => {
        if (attempts === 9) revealAnswer();
        else skipAnswer();
    }

    const init = useEffectEvent(() => startGame());
    
    useEffect(() => {
        init();
    }, [mode]);

    const onTimeOver = useEffectEvent(() => setTimeout(() => timeOver(), 10));

    useEffect(() => {
        if (isTimeOver) onTimeOver();
    }, [isTimeOver])
    
    return {attempts, gameOver, startNew, checkAnswer, timer, isTimeOver, isPending, person, revealAnswer, setAttempts, skipAnswer}
}