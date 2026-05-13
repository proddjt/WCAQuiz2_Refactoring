import useModals from "@/components/layout/hooks/useModals";
import { getPerson, VersusPerson } from "@/data/versus";
import { checkLower } from "@/utils/functions";
import { showConfirm } from "@/utils/notifications";
import { useEffect, useEffectEvent, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function useVersus(mode: string, event: string, result: string){
    const [persons, setPersons] = useState<VersusPerson[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const tempRef = useRef<VersusPerson>(null);

    const {errorModal, endModal} = useModals();
    const [isPending, startTransition] = useTransition();
    const {t} = useTranslation();

    const loadTemp = async (actualId: string, previousId: string) => {
        if (!mode || !event || !result) return
        const {person, error} = await getPerson({mode, event, result, actualId, previousId});
        if (error || !person) {
            return errorModal();
        }
        tempRef.current = person
        return tempRef.current
    }

    const nextGuess = async () => {
        showConfirm(t("versus_next_desc"), t("versus_next_title"));
        if ( !persons?.length || !persons[0].id || !persons[1].id) return
        setScore(prev => prev + 1);
        let count = 0
        while (!tempRef.current && count < 5) {
            count += 1
            await loadTemp(persons[0].id, persons[1].id);
        }
        if (count === 5 || !tempRef.current) return errorModal()
        setPersons(prev => ([prev[1]!, tempRef.current!]));
        loadTemp(persons[1].id, tempRef.current.id);
    }

    const checkAnswer = (first: string, second: string) => {
        if (checkLower(first, second)) startTransition(async () => nextGuess());
        else stopGame();
    }

    const stopGame = () => {
        setGameOver(true);
        endModal(t("versus_lose_modal_title"), t("versus_lose_modal_desc", {points: score}));
    }

    const startNew = () => {
        setScore(0);
        setGameOver(false);
        startGame();
    }

    const startGame = () => {
        if (!mode || !event || !result) return
        startTransition(async () => {
            const {person: first, error: firstError} = await getPerson({mode, event, result});
            if (firstError || !first) {
                return errorModal();
            }
            const {person: second, error: secondError} = await getPerson({mode, event, result, previousId: first?.id});
            if (secondError || !second || second.id === first.id) {
                return errorModal();
            }
            setPersons([first, second]);
            loadTemp(first.id, second.id);
        });
    }

    const init = useEffectEvent(() => startGame());
        
    useEffect(() => {
        init();
    }, [mode, event, result]);
    
    return {persons, nextGuess, isPending, checkAnswer, gameOver, score, startNew}
}