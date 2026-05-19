import MyLoader from "@/components/layout/MyLoader";
import useGoldRush from "./hooks/useGoldRush"
import { Button, Group, Stack, Text } from "@mantine/core";
import useScreen from "@/context/Screen/useScreen";
import Actions from "@/components/layout/Actions";
import { useTranslation } from "react-i18next";
import useModals from "@/components/layout/hooks/useModals";

export default function Quiz({mode} : {mode?: "ez" | "md" | "hd"}){
  const {isPending, comp, guessedEvents, gameOver, startNew} = useGoldRush(mode);
  const {isMdOrLess} = useScreen();
  const {t} = useTranslation();
  const {confirmationModal} = useModals();

  if (isPending) return <MyLoader />
  return (
    <Stack flex={1} px={"xl"} pb={"md"} pt={0} align="center" gap={30}>
        <Actions openInfo={() => {}} w={isMdOrLess ? "100%" : "30%"}>
            <Group justify="center" align="center" gap={5}>
                <Text fw={600} fz={"1.2rem"}>{t("gr_missing_winners")}:</Text>
                <Text fw={600} fz={"1.2rem"}>{comp?.events?.length || 0 - guessedEvents.length}</Text>
            </Group>
            <Button fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>{t("start_new")}</Button>
        </Actions>
        <Stack flex={1} align="center">
            
        </Stack>
    </Stack>
  )
}