'use client'

import { useSearchParams } from "next/navigation";
import useVersus from "./hooks/useVersus";
import { Button, Divider, Group, Stack, Text } from "@mantine/core";
import Actions from "@/components/layout/Actions";
import { useTranslation } from "react-i18next";
import useModals from "@/components/layout/hooks/useModals";
import ProfileCard from "@/components/react-bits/ProfileCard";
import MyLoader from "@/components/layout/MyLoader";
import { formatTime } from "@/utils/functions";
import { eventMap } from "@/data/eventMap";
import useScreen from "@/context/Screen/useScreen";
// import ReactCountryFlag from "react-country-flag";

export default function Quiz(){
    const mode = useSearchParams().get("mode");
    const event = useSearchParams().get("event");
    const result = useSearchParams().get("result");

    const {persons, isPending, checkAnswer, gameOver, score, startNew, isCensored} = useVersus(mode!, event!, result!);
    const {t} = useTranslation();
    const {confirmationModal, versusModal} = useModals();
    const {isMdOrLess} = useScreen();

    if (isPending) return <MyLoader />

    return (
        <Stack flex={1} px={"xl"} pb={"md"} pt={0} align="center" gap={30}>
            <Actions openInfo={versusModal} w={isMdOrLess ? "100%" : "30%"}>
                <Group justify="center" align="center" gap={5}>
                    <Text fw={600} fz={"1.2rem"}>{t("score")}:</Text>
                    <Text fw={600} fz={"1.2rem"}>{score}</Text>
                </Group>
                <Button fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>{t("start_new")}</Button>
            </Actions>
            <Stack flex={1} hiddenFrom="md" align="center" gap={20}>
                <ProfileCard
                avatarUrl={persons[0]?.has_avatar ? persons[0]?.avatarUrl : "/user_placeholder.jpeg"}
                enableMobileTilt
                enableTilt
                behindGlowEnabled={false}
                name={persons[0]?.name}
                title={persons[0]?.id}
                iconUrl={`/patterns/${event}_pattern.png`}
                showUserInfo
                time={formatTime(persons[0]?.result, event!) || "N/A"}
                onClick={() => !gameOver && checkAnswer(persons[0]?.result, persons[1]?.result)}
                eventName={eventMap.get(event!) || "3x3x3 Cube"}
                eventIcon={<span className={`cubing-icon event-${event}`}></span>}
                // flag={<ReactCountryFlag svg countryCode={persons[0]?.country_iso}/>}
                />
                <Divider orientation="horizontal" size="md" c={"lime"}/>
                <ProfileCard
                avatarUrl={persons[1]?.has_avatar ? persons[1]?.avatarUrl : "/user_placeholder.jpeg"}
                enableMobileTilt
                enableTilt
                behindGlowEnabled={false}
                name={persons[1]?.name}
                title={persons[1]?.id}
                iconUrl={`/patterns/${event}_pattern.png`}
                showUserInfo
                time={formatTime(persons[1]?.result, event!) || "N/A"}
                onClick={() => !gameOver && checkAnswer(persons[1]?.result, persons[0]?.result)}
                eventName={eventMap.get(event!) || "3x3x3 Cube"}
                eventIcon={<span className={`cubing-icon event-${event}`}></span>}
                isCensored={isCensored}
                // flag={<ReactCountryFlag svg countryCode={persons[1]?.country_iso}/>}
                />
            </Stack>
            <Group flex={1} justify="center" align="center" gap={200} visibleFrom="md">
                <ProfileCard
                avatarUrl={persons[0]?.has_avatar ? persons[0]?.avatarUrl : "/user_placeholder.jpeg"}
                enableMobileTilt
                enableTilt
                behindGlowEnabled={false}
                name={persons[0]?.name}
                title={persons[0]?.id}
                iconUrl={`/patterns/${event}_pattern.png`}
                showUserInfo
                time={formatTime(persons[0]?.result, event!) || "N/A"}
                onClick={() => !gameOver && checkAnswer(persons[0]?.result, persons[1]?.result)}
                eventName={eventMap.get(event!) || "3x3x3 Cube"}
                eventIcon={<span className={`cubing-icon event-${event}`}></span>}
                // flag={<ReactCountryFlag svg countryCode={persons[0]?.country_iso}/>}
                />
                <Divider orientation="vertical" size="xs" color={"lime"}/>
                <ProfileCard
                avatarUrl={persons[1]?.has_avatar ? persons[1]?.avatarUrl : "/user_placeholder.jpeg"}
                enableMobileTilt
                enableTilt
                behindGlowEnabled={false}
                name={persons[1]?.name}
                title={persons[1]?.id}
                iconUrl={`/patterns/${event}_pattern.png`}
                showUserInfo
                time={formatTime(persons[1]?.result, event!) || "N/A"}
                onClick={() => !gameOver && checkAnswer(persons[1]?.result, persons[0]?.result)}
                eventName={eventMap.get(event!) || "3x3x3 Cube"}
                eventIcon={<span className={`cubing-icon event-${event}`}></span>}
                isCensored={isCensored}
                // flag={<ReactCountryFlag svg countryCode={persons[1]?.country_iso}/>}
                />
            </Group>
        </Stack>
    )
}