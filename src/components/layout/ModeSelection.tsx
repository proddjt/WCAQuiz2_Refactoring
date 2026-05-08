import { Button, Select, Stack } from "@mantine/core";
import BlurText from "../react-bits/BlurText";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getModes, Mode } from "@/config/modes";
import useScreen from "@/context/Screen/useScreen";

interface Props{
    quiz: string;
    defaultValues: Mode[];
    onClick: (param1: string, param2?: string) => void;
    title: string;
    isMultiple?: boolean
}

export default function ModeSelection({quiz, defaultValues, onClick, title, isMultiple} : Props){
    const [selectedMode, setSelectedMode] = useState<Mode>(defaultValues[0]);
    const [secondaryParam, setSecondaryParam] = useState<Mode>(defaultValues[1]);
    const { t } = useTranslation();
    const { isMdOrLess } = useScreen();

    const modes = getModes(quiz)

    return (
        <Stack flex={1} justify="center" align="center" p={"xl"}>
            <BlurText
            text={t(title)}
            animateBy="words"
            direction="top"
            className="mode-selection-text"
            />

            <Select
            value={selectedMode.key}
            data={modes?.first.map(m => ({label: t(m.label), value: m.key}))}
            description={t(selectedMode.description || "")}
            allowDeselect={false}
            onChange={(v) => {
                if (!v || !modes) return;
                const sel = modes.first.find(m => m.key === v);
                if (!sel) return;
                setSelectedMode(sel);
            }}
            w={isMdOrLess ? "80%" : "20%"}
            leftSection={
                <selectedMode.icon size={25}/>
            }
            />

            {isMultiple && (
                <Select
                value={secondaryParam?.key}
                data={modes?.second?.map(m => ({label: t(m.label), value: m.key}))}
                description={t(secondaryParam?.description || "")}
                allowDeselect={false}
                onChange={(v) => {
                    if (!v || !modes) return;
                    const sel = modes.second?.find(m => m.key === v);
                    if (!sel) return;
                    setSecondaryParam(sel);
                }}
                w={isMdOrLess ? "80%" : "20%"}
                leftSection={
                    typeof secondaryParam?.icon === "string" ? <span className={secondaryParam?.icon}></span> : <secondaryParam.icon size={25}/>
                }
                />
            )}
            <Button onClick={() => onClick(selectedMode.key, secondaryParam?.key ? secondaryParam.key : undefined)} w={isMdOrLess ? "80%" : "20%"}>{t("start")}</Button>
        </Stack>
    )
}