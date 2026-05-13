import Card from "@/components/layout/Card";
import useModals from "@/components/layout/hooks/useModals";
import useSearch from "@/components/layout/hooks/useSearch";
import MyLoader from "@/components/layout/MyLoader";
import { formatSecondsTime} from "@/utils/functions";
import { Button, Grid, Group, Image, Loader, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { IoIosStopwatch, IoMdPodium } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import useFocus from "./hooks/useFocus";
import { useEffect } from "react";
import useDialog from "@/components/layout/hooks/useDialog";
import Actions from "@/components/layout/Actions";
import TableWithCols from "../reveal/TableWithCols";

export default function Quiz({mode} : {mode: string}){
    const {attempts, gameOver, isPending, person, isTimeOver, timer, checkAnswer, startNew, revealAnswer, imageFilters, skipAnswer} = useFocus(mode)
    const {imgModal, confirmationModal, focusModal} = useModals();
    const {term, setTerm, isSearching, results} = useSearch(mode);
    const { t } = useTranslation();
    const {toggle, ConnectionDialog, opened} = useDialog();

    useEffect(() => {
        if (!isPending || opened) return;

        const timeoutId = setTimeout(() => {
            toggle();
        }, 5000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isPending, toggle, opened]);

    if (isPending) return <MyLoader Dialog={ConnectionDialog}/>

    return (
        <>
        
        <Stack flex={1} hiddenFrom="md" px={"xl"} pb={"md"} pt={0} align="center" gap={30}>
            <Actions openInfo={focusModal} isFloating={true}>
                <Group justify="space-between" align="center" w={"100%"}>
                    <Group justify="start" align="center" gap={5}>
                        <Text fw={600} fz={"1.5rem"}>{t("score")}:</Text>
                        <Text fw={600} fz={"1.5rem"} c={attempts < 2 ? "green" : attempts < 4 ? "yellow" : "red"}>{5 - attempts}</Text>
                    </Group>
                    <Group justify="start" align="center" gap={5}>
                        <Text fw={600} fz={"1.5rem"} >{t("time")}: </Text>
                        <Text fw={600} fz={"1.5rem"} c={isTimeOver ? "red" : "white"} className={timer <= 10 && timer != 0 && !gameOver? "timer-blinking" : undefined}>{formatSecondsTime(timer)}</Text>
                    </Group>
                    
                </Group>

                <Select
                searchable
                data={results.map((r: {id: string, name: string}) => ({label: r.name, value: r.id}))}
                rightSection={<FaSearch />}
                leftSection={isSearching ? <Loader size={"xs"}/> : null}
                searchValue={term}
                onSearchChange={setTerm}
                size="md"
                w={"100%"}
                disabled={gameOver}
                placeholder={t("searchbar_placeholder")}
                clearable
                onChange={(v) => {
                    if (!v) return
                    checkAnswer(v);
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

                <Button
                fullWidth
                disabled={gameOver}
                variant="light"
                onClick={() => confirmationModal(t("skip_answ_modal_desc"), skipAnswer)}
                >
                    {t("skip")}
                </Button>
                <Button fullWidth disabled={gameOver} variant="outline" onClick={() => confirmationModal(t("reveal_answ_modal_desc"), revealAnswer)}>{t("reveal")}</Button>
                <Button fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>{t("start_new")}</Button>
            </Actions>

            <Image
            src={person?.avatarUrl}
            alt="Quiz image"
            w={"80%"}
            fit={"contain"}
            onClick={() => imgModal(person?.avatarUrl || "", imageFilters)}
            bdrs={"md"}
            key={`${attempts}-IMAGE` || +gameOver}
            style={gameOver ? undefined : imageFilters}
            />

            <Title order={1} mt={20} ta={"center"}>{attempts === 5 || gameOver ? person?.name : "*****************"}</Title>

            <Card
            title={t("personal_info")}
            Icon={RiContactsFill}
            key={attempts === 1 || attempts === 4 ? `${attempts}-PERSONAL` : "static"}
            animation={attempts === 1 || attempts === 4 ? "new-clue" : ""}>
                <Group>
                    <TextInput
                    label={t("nation")}
                    value={person?.country_name}
                    readOnly
                    flex={1}
                    rightSection={mode != "IT" && attempts < 1 ? null : <ReactCountryFlag countryCode={person?.country || ""} svg/>}
                    type={mode != "IT" && attempts < 1 && !gameOver ? "password" : undefined}
                    />
                    <TextInput
                    label="WCA ID"
                    value={attempts === 4 ? `${person?.id.slice(0,4)}••••••` : person?.id}
                    readOnly
                    flex={1}
                    type={attempts < 4 && !gameOver ? "password" : undefined}
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
            <Card title={t("comp_info")} Icon={IoMdPodium} animation={attempts === 2 ? "new-clue" : ""}>
                <Group>
                    <TextInput
                    label={t("comp_numb")}
                    value={person?.numberOfCompetitions}
                    readOnly
                    flex={1}
                    type={attempts < 2 && !gameOver ? "password" : undefined}
                    />
                </Group>
            </Card>
            <Card title={t("best_result")} Icon={IoIosStopwatch} h={"200px"} animation={attempts === 3 ? "new-clue" : ""}>
                <TableWithCols
                items={person?.personal_records || []}
                condition={attempts < 3 && !gameOver}
                tableType="focus"
                />
            </Card>

        </Stack>

        <Grid
        columns={2}
        visibleFrom="md"
        flex={1}
        styles={{
            root: {
                display: "flex",
                flexDirection: "column",
                flexGrow: 1
            },
            inner: {
                flexGrow: 1
            },
            col: {
                display: "flex",
                flexDirection: "column",
                padding: "20px 50px",
                flexGrow: 1,
                justifyContent: "space-between",
            }
        }}
        >
            <Grid.Col span={1}>
                <Image
                src={person?.avatarUrl}
                alt="Quiz image"
                h={"500px"}
                fit={"contain"}
                onClick={() => imgModal(person?.avatarUrl || "", imageFilters)}
                bdrs={"md"}
                key={`${attempts}-IMAGE` || +gameOver}
                style={gameOver ? undefined : imageFilters}
                className="focus-img"
                />
                <Actions openInfo={focusModal}>
                    <Group justify="space-between" align="center" gap={50} w={"100%"}>
                        <Group justify="start" align="center" gap={5}>
                            <Text fw={600} fz={"1.5rem"}>{t("score")}:</Text>
                            <Text fw={600} fz={"1.5rem"} c={attempts < 2 ? "green" : attempts < 4 ? "yellow" : "red"}>{5 - attempts}</Text>
                        </Group>
                        <Group justify="start" align="center" gap={5}>
                            <Text fw={600} fz={"1.5rem"} >{t("time")}: </Text>
                            <Text fw={600} fz={"1.5rem"} c={isTimeOver ? "red" : "white"} className={timer <= 10 && timer != 0 && !gameOver? "timer-blinking" : undefined}>{formatSecondsTime(timer)}</Text>
                        </Group>
                        
                    </Group>

                    <Select
                    searchable
                    data={results.map((r: {id: string, name: string}) => ({label: r.name, value: r.id}))}
                    rightSection={<FaSearch />}
                    leftSection={isSearching ? <Loader size={"xs"}/> : null}
                    searchValue={term}
                    onSearchChange={setTerm}
                    size="sm"
                    w={"100%"}
                    disabled={gameOver}
                    placeholder={t("searchbar_placeholder")}
                    clearable
                    onChange={(v) => {
                        if (!v) return
                        checkAnswer(v);
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

                    <Button
                    fullWidth
                    disabled={gameOver}
                    variant="light"
                    size="xs"
                    onClick={() => confirmationModal(t("skip_answ_modal_desc"), skipAnswer)}
                    >
                        {t("skip")}
                    </Button>
                    <Button size="xs" fullWidth disabled={gameOver} variant="outline" onClick={() => confirmationModal(t("reveal_answ_modal_desc"), revealAnswer)}>{t("reveal")}</Button>
                    <Button size="xs" fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>{t("start_new")}</Button>
                </Actions>
            </Grid.Col>
            <Grid.Col span={1}>
                <Title order={1} mt={20} ta={"center"}>{attempts === 5 || gameOver ? person?.name : "*****************"}</Title>

                <Card
                title={t("personal_info")}
                Icon={RiContactsFill}
                key={attempts === 1 || attempts === 4 ? `${attempts}-PERSONAL` : "static"}
                animation={attempts === 1 || attempts === 4 ? "new-clue" : ""}>
                    <Group gap={5}>
                        <TextInput
                        label={t("nation")}
                        value={person?.country_name}
                        readOnly
                        flex={1}
                        rightSection={mode != "IT" && attempts < 1 ? null : <ReactCountryFlag countryCode={person?.country || ""} svg/>}
                        type={mode != "IT" && attempts < 1 && !gameOver ? "password" : undefined}
                        />
                        <TextInput
                        label="WCA ID"
                        value={attempts === 4 ? `${person?.id.slice(0,4)}••••••` : person?.id}
                        readOnly
                        flex={1}
                        type={attempts < 4 && !gameOver ? "password" : undefined}
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
                <Card title={t("comp_info")} Icon={IoMdPodium} animation={attempts === 2 ? "new-clue" : ""}>
                    <Group>
                        <TextInput
                        label={t("comp_numb")}
                        value={person?.numberOfCompetitions}
                        readOnly
                        flex={1}
                        type={attempts < 2 && !gameOver ? "password" : undefined}
                        />
                    </Group>
                </Card>
                <Card title={t("best_result")} Icon={IoIosStopwatch} h={"200px"} animation={attempts === 3 ? "new-clue" : ""}>
                    <TableWithCols
                    items={person?.personal_records || []}
                    condition={attempts < 3 && !gameOver}
                    tableType="focus"
                    />
                </Card>
            </Grid.Col>
        </Grid>
        </>
    )
}