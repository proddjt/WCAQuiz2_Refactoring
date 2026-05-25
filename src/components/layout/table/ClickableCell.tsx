import useGoldrushGuessedEvents from "@/context/GoldrushGuessedEvents/useGoldrushGuessedEvents";
import { Button, Group, Text } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";
import { useTranslation } from "react-i18next";

export default function ClickableCell({params, condition}: {params: CustomCellRendererProps, condition: boolean}) {
  const { t } = useTranslation();
  const {guessedEvents} = useGoldrushGuessedEvents();
  return (
    <>
    {guessedEvents.some(((event: string) => params.data.event === event)) || !condition ?
    <Text fz={"xs"}>{params.value}</Text> :
    <Group justify="center" w={"100%"}>
      <Button size="compact-xs" onClick={() => params.context.insertAnswer(params.data.event)}>{t("insert_answer")}</Button>
    </Group>
    }
    </>
  )
}