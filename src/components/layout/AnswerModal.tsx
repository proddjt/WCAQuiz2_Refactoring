import { eventMap } from "@/data/eventMap";
import { Group, Loader, Select, Stack, Text } from "@mantine/core"
import { useTranslation } from "react-i18next";
import useSearch from "./hooks/useSearch";
import { FaSearch } from "react-icons/fa";
import { modals } from "@mantine/modals";
import { useState } from "react";

interface Props {
  event: string
  onConfirm: (v: string) => Promise<unknown>
}

export default function AnswerModal({event, onConfirm} : Props){
  const [error, setError] = useState(false);

  const {t} = useTranslation();
  const {term, setTerm, isSearching, results} = useSearch("world");

  const check = async (answ: string) => {
    const res = await onConfirm(answ);
    if (res) modals.closeAll();
    else setError(true)
  }

  return (
    <Stack>
      <Text fw={600} fz={"sm"}>{t("goldrush_answer_text", {event: eventMap.get(event)})}</Text>
      <Select
      searchable
      data={results.map((r: {id: string, name: string}) => ({label: r.name, value: r.id}))}
      rightSection={<FaSearch />}
      leftSection={isSearching ? <Loader size={"xs"}/> : null}
      searchValue={term}
      onSearchChange={setTerm}
      size="md"
      w={"100%"}
      placeholder={t("searchbar_placeholder")}
      clearable
      error={error && t("goldrush_answer_error")}
      onChange={(v) => {
        if (!v) return
        check(v);
      }}
      renderOption={(i) => 
        <Group gap={5}>
          <Text size="sm" fw={500}>
          {i.option.label}
          </Text>
          •
          <Text size="xs" c="dimmed">
          {i.option.value}
          </Text>
        </Group>
      }
      />
    </Stack>
  )
}