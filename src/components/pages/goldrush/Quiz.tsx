import MyLoader from "@/components/layout/MyLoader";
import useGoldRush from "./hooks/useGoldRush"
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import useScreen from "@/context/Screen/useScreen";
import Actions from "@/components/layout/Actions";
import { useTranslation } from "react-i18next";
import useModals from "@/components/layout/hooks/useModals";
import { formatSecondsTime } from "@/utils/functions";
import Card from "@/components/layout/Card";

export default function Quiz({mode} : {mode?: "ez" | "md" | "hd"}){
  const {isPending, comp, guessedEvents, gameOver, startNew, revealAnswer, timer} = useGoldRush(mode);
  const {isMdOrLess} = useScreen();
  const {t} = useTranslation();
  const {confirmationModal} = useModals();

  if (isPending) return <MyLoader />
  return (
    <Stack flex={1} px={"xl"} pb={"md"} pt={0} align="center" gap={30}>
        <Actions openInfo={() => {}} w={isMdOrLess ? "100%" : "30%"}>
          <Group justify="space-between" align="center" w={"100%"}>
            <Group justify="center" align="center" gap={5}>
                <Text fw={600} fz={"1.2rem"}>{t("gr_missing_winners")}</Text>
                <Text fw={600} fz={"1.2rem"}>{comp?.events?.length || 0 - guessedEvents.length}</Text>
            </Group>
            <Group justify="start" align="center" gap={5}>
                <Text fw={600} fz={"1.2rem"} >{t("time")}: </Text>
                <Text fw={600} fz={"1.2rem"} c={timer === 0 ? "red" : "white"} className={timer <= 10 && timer != 0 && !gameOver? "timer-blinking" : undefined}>{formatSecondsTime(timer)}</Text>
            </Group>
          </Group>
          <Button
            fullWidth
            disabled={gameOver}
            variant="light"
            onClick={() => confirmationModal(t("skip_answ_modal_desc"), () => {})}
            >
              {t("skip")}
          </Button>
          <Button fullWidth disabled={gameOver} variant="outline" onClick={() => confirmationModal(t("reveal_answ_modal_desc"), revealAnswer)}>{t("reveal")}</Button>
          <Button fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>{t("start_new")}</Button>
        </Actions>
        <Stack flex={1} align="center">
            <Title order={1}  ta={"center"}>{comp?.name}</Title>

            <Card
              title={t("competition_info")}
              Icon={RiContactsFill}
            >

            </Card>
        </Stack>
    </Stack>
  )
}