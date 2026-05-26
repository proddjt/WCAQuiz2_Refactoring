"use client";

import useDialog from "@/components/layout/hooks/useDialog";
import useModals from "@/components/layout/hooks/useModals";
import useSearch from "@/components/layout/hooks/useSearch";
import MyLoader from "@/components/layout/MyLoader";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useReveal from "./hooks/useReveal";
import Actions from "@/components/layout/Actions";
import { Button, Grid, Group, Image, Loader, ScrollArea, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { formatSecondsTime, sortEventDataAsArray } from "@/utils/functions";
import { FaMedal, FaSearch } from "react-icons/fa";
import Card from "@/components/layout/Card";
import { RiContactsFill, RiTimerFill } from "react-icons/ri";
import ReactCountryFlag from "react-country-flag";
import { IoMdPodium } from "react-icons/io";
import MyList from "@/components/layout/MyList";
import TableWithCols from "./TableWithCols";

export default function Quiz({ mode, difficulty }: { mode: string; difficulty: string }) {
  const { attempts, gameOver, isPending, person, isTimeOver, timer, checkAnswer, startNew, revealAnswer, skipAnswer, assignRef, tableRef } =
    useReveal(mode, difficulty);
  const { term, setTerm, isSearching, results } = useSearch(mode);
  const { confirmationModal, revealModal } = useModals();
  const { toggle, ConnectionDialog, opened } = useDialog();
  const { t } = useTranslation();

  const rootRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useLayoutEffect(() => {
    if (rootRef.current) setMaxHeight(rootRef.current.clientHeight - 50);
  }, [rootRef]);

  useEffect(() => {
    if (!isPending || opened) return;

    const timeoutId = setTimeout(() => {
      toggle();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPending, toggle, opened]);

  if (isPending) return <MyLoader Dialog={ConnectionDialog} />;

  return (
    <>
      <Stack flex={1} hiddenFrom="md" px={"xl"} pb={"md"} pt={0} align="center" gap={30}>
        <Actions openInfo={revealModal} isFloating={true}>
          <Group justify="space-between" align="center" w={"100%"}>
            <Group justify="start" align="center" gap={5}>
              <Text fw={600} fz={"1rem"}>
                {t("score")}:
              </Text>
              <Text fw={600} fz={"1rem"} c={attempts < 3 ? "green" : attempts < 6 ? "yellow" : "red"}>
                {10 - attempts}
              </Text>
            </Group>
            <Group justify="start" align="center" gap={5}>
              <Text fw={600} fz={"1rem"}>
                {t("time")}:{" "}
              </Text>
              <Text
                fw={600}
                fz={"1rem"}
                c={isTimeOver ? "red" : "white"}
                className={timer <= 10 && timer != 0 && !gameOver ? "timer-blinking" : undefined}
              >
                {formatSecondsTime(timer)}
              </Text>
            </Group>
          </Group>

          <Select
            searchable
            data={results.map((r: { id: string; name: string }) => ({ label: r.name, value: r.id }))}
            rightSection={<FaSearch />}
            leftSection={isSearching ? <Loader size={"xs"} /> : null}
            searchValue={term}
            onSearchChange={setTerm}
            size="md"
            w={"100%"}
            disabled={gameOver}
            placeholder={t("searchbar_placeholder")}
            clearable
            onChange={(v) => {
              if (!v) return;
              checkAnswer(v);
            }}
            renderOption={(i) => (
              <Group gap={5}>
                <Text size="sm" fw={500}>
                  {i.option.label}
                </Text>
                •
                <Text size="xs" c="dimmed">
                  {i.option.value}
                </Text>
              </Group>
            )}
          />

          <Button fullWidth disabled={gameOver} variant="light" onClick={() => confirmationModal(t("skip_answ_modal_desc"), skipAnswer)}>
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

        {gameOver && <Image src={person?.avatarUrl} alt="Quiz image" h={"500px"} fit={"contain"} bdrs={"md"} />}

        <Title order={1} mt={20} ta={"center"}>
          {attempts === 10 || gameOver ? person?.name : "*****************"}
        </Title>

        <Card
          title={t("personal_info")}
          Icon={RiContactsFill}
          assignRef={assignRef([1, 6])}
        >
          <Group gap={5}>
            <TextInput
              label={t("nation")}
              value={person?.country_name}
              readOnly
              flex={1}
              rightSection={mode != "IT" && attempts < 1 ? null : <ReactCountryFlag countryCode={person?.country || ""} svg />}
              type={mode != "IT" && attempts < 1 && !gameOver ? "password" : undefined}
            />
            <TextInput
              label="WCA ID"
              value={attempts < 11 && !gameOver ? `${person?.id.slice(0, 4)}••••••` : person?.id}
              readOnly
              flex={1}
              type={attempts < 6 && !gameOver ? "password" : undefined}
            />
            <TextInput
              label={t("gender")}
              value={t(person?.gender || "")}
              readOnly
              flex={1}
              type={attempts < 1 && !gameOver ? "password" : undefined}
            />
          </Group>
        </Card>
        <Card
          title={t("comp_info")}
          Icon={IoMdPodium}
          assignRef={assignRef([2, 7])}
        >
          <Group gap={5}>
            <Stack w={"48%"}>
              <TextInput
                label={t("comp_numb")}
                value={person?.numberOfCompetitions}
                readOnly
                flex={1}
                type={attempts < 2 && !gameOver ? "password" : undefined}
              />
              <MyList list={person?.competitionIds || []} condition={attempts < 7 && !gameOver} mah={175} />
            </Stack>
            <Stack w={"48%"}>
              <TextInput
                label={t("champ_numb")}
                value={person?.numberOfChampionships}
                readOnly
                flex={1}
                type={attempts < 2 && !gameOver ? "password" : undefined}
              />
              <MyList list={person?.championshipIds || []} condition={attempts < 7 && !gameOver} mah={175} />
            </Stack>
          </Group>
        </Card>
        <Card
          title={t("med_and_rec")}
          Icon={FaMedal}
          h={"330px"}
          assignRef={assignRef([3, 4])}
        >
          <Text fw={700} fz={"sm"}>
            {t("medals")}
          </Text>
          <TableWithCols items={[person?.medals]} condition={attempts < 3 && !gameOver} tableType="medals" />
          <Text fw={700} fz={"sm"}>
            {t("records")}
          </Text>
          <TableWithCols items={[person?.records]} condition={attempts < 4 && !gameOver} tableType="records" />
        </Card>

        <Card
          title={t("results")}
          Icon={RiTimerFill}
          h={"400px"}
          assignRef={assignRef([5, 8, 9])}
        >
          <TableWithCols
            items={sortEventDataAsArray(person?.personal_records || {})}
            multipleConditions={[attempts < 5 && !gameOver, attempts < 8 && !gameOver, attempts < 9 && !gameOver]}
            tableType="results"
            ref={tableRef}
          />
        </Card>
      </Stack>

      <Grid
        columns={2}
        visibleFrom="md"
        ref={rootRef}
        flex={1}
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          },
          inner: {
            flexGrow: 1,
          },
          col: {
            display: "flex",
            flexDirection: "column",
            padding: "20px 50px",
            flexGrow: 1,
            justifyContent: "space-between",
          },
        }}
      >
        <Grid.Col span={1}>
          {gameOver && <Image src={person?.avatarUrl} alt="Quiz image" h={"450px"} fit={"contain"} bdrs={"md"} />}
          <Actions openInfo={revealModal}>
            <Group justify="space-between" align="center" gap={50} w={"100%"}>
              <Group justify="start" align="center" gap={5}>
                <Text fw={600} fz={"1.3rem"}>
                  {t("score")}:
                </Text>
                <Text fw={600} fz={"1.3rem"} c={attempts < 3 ? "green" : attempts < 6 ? "yellow" : "red"}>
                  {10 - attempts}
                </Text>
              </Group>
              <Group justify="start" align="center" gap={5}>
                <Text fw={600} fz={"1.3rem"}>
                  {t("time")}:{" "}
                </Text>
                <Text
                  fw={600}
                  fz={"1.3rem"}
                  c={isTimeOver ? "red" : "white"}
                  className={timer <= 10 && timer != 0 && !gameOver ? "timer-blinking" : undefined}
                >
                  {formatSecondsTime(timer)}
                </Text>
              </Group>
            </Group>

            <Select
              searchable
              data={results.map((r: { id: string; name: string }) => ({ label: r.name, value: r.id }))}
              rightSection={<FaSearch />}
              leftSection={isSearching ? <Loader size={"xs"} /> : null}
              searchValue={term}
              onSearchChange={setTerm}
              size="md"
              w={"100%"}
              disabled={gameOver}
              placeholder={t("searchbar_placeholder")}
              clearable
              onChange={(v) => {
                if (!v) return;
                checkAnswer(v);
              }}
              renderOption={(i) => (
                <Group gap={5}>
                  <Text size="sm" fw={500}>
                    {i.option.label}
                  </Text>
                  •
                  <Text size="xs" c="dimmed">
                    {i.option.value}
                  </Text>
                </Group>
              )}
            />

            <Button fullWidth disabled={gameOver} variant="light" onClick={() => confirmationModal(t("skip_answ_modal_desc"), skipAnswer)}>
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
        </Grid.Col>

        <Grid.Col span={1}>
          <ScrollArea
            h={maxHeight}
            type="hover"
            offsetScrollbars
            styles={{ content: { display: "flex", flexDirection: "column", gap: 10 } }}
          >
            <Title order={1} mt={20} ta={"center"}>
              {attempts === 10 || gameOver ? person?.name : "*****************"}
            </Title>

            <Card
              title={t("personal_info")}
              Icon={RiContactsFill}
              key={attempts === 1 || attempts === 6 ? `${attempts}-PERSONAL` : "static-personal"}
              animation={attempts === 1 || attempts === 6 ? "new-clue" : ""}
            >
              <Group>
                <TextInput
                  label={t("nation")}
                  value={person?.country_name}
                  readOnly
                  flex={1}
                  rightSection={mode != "IT" && attempts < 1 ? null : <ReactCountryFlag countryCode={person?.country || ""} svg />}
                  type={mode != "IT" && attempts < 1 && !gameOver ? "password" : undefined}
                />
                <TextInput
                  label="WCA ID"
                  value={attempts < 11 ? `${person?.id.slice(0, 4)}••••••` : person?.id}
                  readOnly
                  flex={1}
                  type={attempts < 6 && !gameOver ? "password" : undefined}
                />
                <TextInput
                  label={t("gender")}
                  value={t(person?.gender || "")}
                  readOnly
                  flex={1}
                  type={attempts < 1 && !gameOver ? "password" : undefined}
                />
              </Group>
            </Card>
            <Card
              title={t("comp_info")}
              Icon={IoMdPodium}
              animation={attempts === 2 || attempts === 7 ? "new-clue" : ""}
              key={attempts === 2 || attempts === 7 ? `${attempts}-COMP` : "static-comp"}
            >
              <Group gap={5}>
                <Stack w={"48%"}>
                  <TextInput
                    label={t("comp_numb")}
                    value={person?.numberOfCompetitions}
                    readOnly
                    flex={1}
                    type={attempts < 2 && !gameOver ? "password" : undefined}
                  />
                  <MyList list={person?.competitionIds || []} condition={attempts < 7 && !gameOver} mah={175} />
                </Stack>
                <Stack w={"48%"}>
                  <TextInput
                    label={t("champ_numb")}
                    value={person?.numberOfChampionships}
                    readOnly
                    flex={1}
                    type={attempts < 2 && !gameOver ? "password" : undefined}
                  />
                  <MyList list={person?.championshipIds || []} condition={attempts < 7 && !gameOver} mah={175} />
                </Stack>
              </Group>
            </Card>
            <Card
              title={t("med_and_rec")}
              Icon={FaMedal}
              h={"330px"}
              animation={attempts === 3 || attempts === 4 ? "new-clue" : ""}
              key={`TABLE-${attempts}`}
            >
              <Text fw={700} fz={"sm"}>
                {t("medals")}
              </Text>
              <TableWithCols items={[person?.medals]} condition={attempts < 3 && !gameOver} tableType="medals" />
              <Text fw={700} fz={"sm"}>
                {t("records")}
              </Text>
              <TableWithCols items={[person?.records]} condition={attempts < 4 && !gameOver} tableType="records" />
            </Card>

            <Card
              title={t("results")}
              Icon={RiTimerFill}
              h={"400px"}
              animation={attempts === 5 || attempts === 8 || attempts === 9 ? "new-clue" : ""}
              key={`TABLE-2-${attempts}`}
            >
              <TableWithCols
                items={sortEventDataAsArray(person?.personal_records || {})}
                multipleConditions={[attempts < 5 && !gameOver, attempts < 8 && !gameOver, attempts < 9 && !gameOver]}
                tableType="results"
              />
            </Card>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </>
  );
}
