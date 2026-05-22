"use client";

import MyLoader from "@/components/layout/MyLoader";
import useGoldRush from "./hooks/useGoldRush";
import { Button, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import useScreen from "@/context/Screen/useScreen";
import Actions from "@/components/layout/Actions";
import { useTranslation } from "react-i18next";
import useModals from "@/components/layout/hooks/useModals";
import { formatSecondsTime } from "@/utils/functions";
import Card from "@/components/layout/Card";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { useEffect } from "react";
import useDialog from "@/components/layout/hooks/useDialog";
import { FaMedal } from "react-icons/fa";
import TableWithCols from "../reveal/TableWithCols";
import MyList from "@/components/layout/MyList";
import useGoldrushGuessedEvents from "@/context/GoldrushGuessedEvents/useGoldrushGuessedEvents";

export default function Quiz({ mode }: { mode?: "ez" | "md" | "hd" }) {
  const { isPending, comp, gameOver, startNew, revealAnswer, timer, attempts, tableContext } = useGoldRush(mode);
  const { isMdOrLess } = useScreen();
  const { t } = useTranslation();
  const { confirmationModal } = useModals();
  const { toggle, ConnectionDialog, opened } = useDialog();
  const { guessedEvents } = useGoldrushGuessedEvents();

  useEffect(() => {
    if (!isPending || opened) return;

    const timeoutId = setTimeout(() => {
      toggle();
    }, 8000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPending, toggle, opened]);

  if (isPending) return <MyLoader Dialog={ConnectionDialog} />;

  console.log((comp?.events?.length || 0) - guessedEvents.length)
  return (
    <Stack flex={1} px={"xl"} pb={"md"} pt={0} align="center" gap={30}>
      <Actions openInfo={() => {}} w={isMdOrLess ? "100%" : "30%"}>
        <Group justify="space-between" align="center" w={"100%"}>
          <Group justify="center" align="center" gap={5}>
            <Text fw={600} fz={"1.2rem"}>
              {t("gr_missing_winners")}
            </Text>
            <Text fw={600} fz={"1.2rem"}>
              {(comp?.events?.length || 0) - guessedEvents.length}
            </Text>
          </Group>
          <Group justify="start" align="center" gap={5}>
            <Text fw={600} fz={"1.2rem"}>
              {t("time")}:{" "}
            </Text>
            <Text
              fw={600}
              fz={"1.2rem"}
              c={timer === 0 ? "red" : "white"}
              className={timer <= 10 && timer != 0 && !gameOver ? "timer-blinking" : undefined}
            >
              {formatSecondsTime(timer)}
            </Text>
          </Group>
        </Group>
        <Button fullWidth disabled={gameOver} variant="light" onClick={() => confirmationModal(t("skip_answ_modal_desc"), () => {})}>
          {t("skip")}
        </Button>
        <Button
          fullWidth
          disabled={gameOver}
          variant="outline"
          onClick={() => confirmationModal(t("reveal_answ_modal_desc"), revealAnswer)}
        >
          {t("reveal")}
        </Button>
        <Button fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>
          {t("start_new")}
        </Button>
      </Actions>
      <Stack flex={1} align="center">
        <Title order={1} ta={"center"}>
          {comp?.name}
        </Title>

        <Card title={t("competition_info")} Icon={MdOutlineContentPasteSearch}>
          <Group justify="space-between" align="center" w={"100%"} visibleFrom="md">
            <TextInput readOnly flex={1} label={t("where")} value={comp?.location} />
            <TextInput readOnly flex={1} label={t("duration")} value={comp?.date} />
            <TextInput readOnly flex={1} label={t("part_number")} value={comp?.competitors.count} />
          </Group>
          <Stack w={"100%"} hiddenFrom="md">
            <TextInput readOnly flex={1} label={t("where")} value={comp?.location} />
            <TextInput readOnly flex={1} label={t("duration")} value={comp?.date} />
            <TextInput readOnly flex={1} label={t("part_number")} value={comp?.competitors.count} />
          </Stack>
        </Card>

        <Card title={t("podiums_comps")} Icon={FaMedal} key={attempts} animation={attempts > 0 ? "new-clue" : undefined}>
          <Group justify="space-between" align="center" w={"100%"} visibleFrom="md">
            <TableWithCols tableType="goldrush" items={comp?.podiums || []} context={tableContext} />
            <MyList list={comp?.competitors.competitors.map((c) => c.name) || []} mah={300} condition={attempts > 1} />
          </Group>
          <Stack h={"600px"} w={"100%"} hiddenFrom="md">
            <TableWithCols
              tableType="goldrush"
              items={comp?.podiums || []}
              context={tableContext}
              multipleConditions={[!gameOver, attempts < 0 && !gameOver, attempts < 2 && !gameOver]}
            />
            <MyList list={comp?.competitors.competitors.map((c) => c.name) || []} mah={300} condition={attempts <= 1} />
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
