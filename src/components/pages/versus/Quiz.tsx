'use client'

import { useSearchParams } from "next/navigation";
import useVersus from "./hooks/useVersus";
import { Button, Group, Stack, Text } from "@mantine/core";
import Actions from "@/components/layout/Actions";
import { useTranslation } from "react-i18next";
import useModals from "@/components/layout/hooks/useModals";
import ProfileCard from "@/components/react-bits/ProfileCard";
import MyLoader from "@/components/layout/MyLoader";

export default function Quiz(){
    const mode = useSearchParams().get("mode");
    const event = useSearchParams().get("event");
    const result = useSearchParams().get("result");

    const {persons, nextGuess, isPending, checkAnswer, gameOver, score, startNew} = useVersus(mode!, event!, result!);
    const {t} = useTranslation();
    const {confirmationModal} = useModals();

    if (isPending) return <MyLoader />

    return (
        <Stack flex={1} px={"xl"} pb={"md"} pt={0} align="center" gap={30}>
            <Actions openInfo={() => {}}>
                <Group justify="center" align="center" gap={5}>
                    <Text fw={600} fz={"1.2rem"}>{t("score")}:</Text>
                    <Text fw={600} fz={"1.2rem"}>{score}</Text>
                </Group>
                <Button fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>{t("start_new")}</Button>
            </Actions>
            <Stack flex={1} hiddenFrom="md" align="center" gap={20}>
                <ProfileCard
                avatarUrl={persons[0]?.has_avatar ? persons[0]?.avatarUrl : "empty"}
                enableMobileTilt
                name={persons[0]?.name}
                title={persons[0]?.id}
                iconUrl={`/patterns/${event}_pattern.png`}
                />
            </Stack>
            <Group flex={1} justify="center" align="center" gap={50} visibleFrom="md">
                <ProfileCard
                avatarUrl={persons[0]?.has_avatar ? persons[0]?.avatarUrl : "https://placehold.co/600x400"}
                enableMobileTilt
                enableTilt
                behindGlowEnabled={false}
                name={persons[0]?.name}
                title={persons[0]?.id}
                iconUrl={`/patterns/${event}_pattern.png`}
                showUserInfo={false}
                />
                <ProfileCard
                avatarUrl={persons[1]?.has_avatar ? persons[1]?.avatarUrl : "https://placehold.co/600x400"}
                enableMobileTilt
                enableTilt
                behindGlowEnabled={false}
                name={persons[1]?.name}
                title={persons[1]?.id}
                iconUrl={`/patterns/${event}_pattern.png`}
                showUserInfo={false}
                />
            </Group>
        </Stack>
    )
}