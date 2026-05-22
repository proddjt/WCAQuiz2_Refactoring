import { formatTime } from "@/utils/functions";
import { Divider, Group, Text } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function ResultCell({params, isCensored} : {params: CustomCellRendererProps, isCensored: string | undefined}) {
  const { t } = useTranslation();
  const person = useMemo(() => params.data[params.value === 1 ? "first" : params.value === 2 ? "second" : "third"], [params]);
  return (
    <Group align="center" gap={5} className={isCensored}>
      <Text size="xs" fw={500}>{t("single")}:</Text>
      <Text size="xs">{person.best === 0 ? "-" : person.best === -1 ? "DNF" : formatTime(person.best, params.data.event)}</Text>
      <Divider orientation="vertical" size="xs" px={5}/>
      <Text size="xs" fw={500}>{t("average")}:</Text>
      <Text size="xs">{person.average === 0 ? "-" : person.average === -1 ? "DNF" : formatTime(person.average, params.data.event)}</Text>
    </Group>
  )
}