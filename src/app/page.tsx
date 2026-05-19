'use client'

import { Button, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

import Logo from "#/public/wcaquiz_logo.png"
import Reveal from "#/public/reveal.jpeg"
import Focus from "#/public/focus.jpeg"
import Versus from "#/public/versus.jpeg"
import Goldrush from "#/public/goldrush.jpeg"
import BlurText from "@/components/react-bits/BlurText";
import HomeCard from "@/components/home/HomeCard";
import { useRouter } from "next/navigation";
import { FaAnglesDown } from "react-icons/fa6";
import { useRef } from "react";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const modesRef = useRef<HTMLDivElement>(null);
  return (
    <Stack flex={1}>
      {/* FROM MD */}
      <Group flex={1} justify="space-around" align="start" p={"xl"} visibleFrom="md">
        <Stack flex={1} h={"100%"} align="center" justify="center">
          <Image src={Logo.src} alt="WCAQuiz Logo" className="floating-img" w={"80%"}/>
          <BlurText
          text={t("main_title")}
          animateBy="words"
          direction="top"
          className="homepage-title"
          />
          <Title order={3} ta={"center"} fw={500}>{t("main_subtitle")}</Title>
        </Stack>
        <Stack flex={1} h={"100%"} align="center" justify="center">
          <Text c={"dimmed"} ta={"center"} fz={"1.5rem"} fw={500}>{t("choose_mode")}</Text>
          <Group justify="center" w={"100%"} gap={75}>
            <HomeCard text="Reveal" info={t("reveal_desc")} image={Reveal.src} animation="float-breeze" onClick={() => router.push("/reveal")}/>
            <HomeCard text="Focus" info={t("focus_desc")} image={Focus.src} animation="gentle-drift" onClick={() => router.push("/focus")}/>
          </Group>
          <Group justify="center"w={"100%"} gap={75}>
            <HomeCard text="Versus" info={t("versus_desc")} image={Versus.src} animation="wind-sway" onClick={() => router.push("/versus")}/>
            <HomeCard text="Goldrush" info={t("goldrush_desc")} image={Goldrush.src} animation="float-breeze" onClick={() => router.push("/goldrush")} disabled/>
          </Group>
        </Stack>
      </Group>

      {/* TO MD */}
      <Stack align="center" hiddenFrom="md" p={"xl"} h={"100vh"} justify="center">
        <Image src={Logo.src} alt="WCAQuiz Logo" className="floating-img" w={"90%"}/>
        <BlurText
        text={t("main_title")}
        animateBy="words"
        direction="top"
        className="homepage-title"
        />
        <Title order={3} ta={"center"} fw={500}>{t("main_subtitle")}</Title>

        <Button mt={"xl"} onClick={() => modesRef.current?.scrollIntoView({behavior: "smooth"})}>
          <Group justify="center" gap={10}>
            <FaAnglesDown size={12} className="arrow-bounce"/>
            <Text>{t("choose_mode")}</Text>
            <FaAnglesDown size={12} className="arrow-bounce"/>
          </Group>
        </Button>
      </Stack>
      <Stack align="center" hiddenFrom="md" p={"xl"} h={"100vh"} justify="center" gap={25} ref={modesRef}>
        <Title order={2}>{t("modes")}</Title>
          <HomeCard text="Reveal" info={t("reveal_desc")} image={Reveal.src} animation="float-breeze" onClick={() => router.push("/reveal")}/>
          <HomeCard text="Focus" info={t("focus_desc")} image={Focus.src} animation="gentle-drift" onClick={() => router.push("/focus")}/>
          <HomeCard text="Versus" info={t("versus_desc")} image={Versus.src} animation="wind-sway" onClick={() => router.push("/versus")}/>
          <HomeCard text="Goldrush" info={t("goldrush_desc")} image={Goldrush.src} animation="float-breeze" onClick={() => router.push("/goldrush")} disabled/>
      </Stack>
    </Stack>
  );
}
