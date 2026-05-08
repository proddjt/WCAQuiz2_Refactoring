import Card from "@/components/layout/Card";
import useModals from "@/components/layout/hooks/useModals";
import useSearch from "@/components/layout/hooks/useSearch";
import useTable from "@/components/layout/hooks/useTable";
import MyLoader from "@/components/layout/MyLoader";
import { Table } from "@/components/layout/Table";
import { formatSecondsTime} from "@/utils/functions";
import { Button, Group, Image, Loader, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { IoIosStopwatch, IoMdPodium } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import useFocus from "./hooks/useFocus";

export default function Quiz({mode} : {mode: string}){
    const {attempts, gameOver, isPending, person, isTimeOver, timer, checkAnswer, startNew, revealAnswer, setAttempts, imageFilters} = useFocus(mode)
    const {imgModal, confirmationModal} = useModals();
    const {term, setTerm, isSearching, results} = useSearch(mode);
    const { t } = useTranslation();
    const {cols} = useTable("focus", attempts < 4)

    if (isPending) return <MyLoader />

    return (
        <Stack flex={1} hiddenFrom="md" p={"xl"} align="center" gap={30}>
            <Stack
            w={"100%"}
            gap={10}
            style={{
                position: "sticky",
                top: 15,
                zIndex: 1,
                backdropFilter: "blur(10px)",
                background: "rgba(20, 20, 20, 0.55)",
                borderRadius: 12,
                padding: "12px 16px",
                border: "1px solid rgba(255,255,255,0.05)",
            }}>
                <Group justify="space-between" align="center" gap={50} w={"100%"}>
                    <Group justify="start" align="center" gap={5}>
                        <Text fw={600} fz={"1.5rem"}>{t("score")}:</Text>
                        <Text fw={600} fz={"1.5rem"} c={attempts < 3 ? "green" : attempts < 5 ? "yellow" : "red"}>{6 - attempts}</Text>
                    </Group>
                    <Group justify="start" align="center" gap={5}>
                        <Text fw={600} fz={"1.5rem"} >{t("time")}: </Text>
                        <Text fw={600} fz={"1.5rem"} c={isTimeOver ? "red" : "white"} className={timer <= 10 && timer != 0 ? "timer-blinking" : undefined}>{formatSecondsTime(timer)}</Text>
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

                <Button fullWidth disabled={gameOver} variant="light" onClick={() => confirmationModal(t("skip_answ_modal_desc"), () => setAttempts(prev => prev + 1))}>{t("skip")}</Button>
                <Button fullWidth disabled={gameOver} variant="outline" onClick={() => confirmationModal(t("reveal_answ_modal_desc"), revealAnswer)}>{t("reveal")}</Button>
                <Button fullWidth disabled={!gameOver} onClick={() => confirmationModal(t("start_new_modal_desc"), startNew)}>{t("start_new")}</Button>
            </Stack>

            <Image
            src={person?.avatarUrl}
            alt="Quiz image"
            w={"80%"}
            fit={"contain"}
            onClick={() => imgModal(person?.avatarUrl || "", imageFilters)}
            bdrs={"md"}
            key={attempts || +gameOver}
            style={gameOver ? undefined : imageFilters}
            />

            <Title order={1} mt={20} ta={"center"}>{attempts === 6 || gameOver ? person?.name : "*****************"}</Title>

            <Card title={t("personal_info")} Icon={RiContactsFill}>
                <Group>
                    <TextInput
                    label={t("nation")}
                    value={person?.country_name}
                    readOnly
                    flex={1}
                    rightSection={mode != "IT" && attempts < 2 ? null : <ReactCountryFlag countryCode={person?.country || ""} svg/>}
                    type={mode != "IT" && attempts < 2 && !gameOver ? "password" : undefined}
                    />
                    <TextInput
                    label="WCA ID"
                    value={attempts === 5 ? `${person?.id.slice(0,4)}••••••` : person?.id}
                    readOnly
                    flex={1}
                    type={attempts < 5 && !gameOver ? "password" : undefined}
                    />
                    <TextInput
                    label={t("gender")}
                    value={t(person?.gender || "")}
                    readOnly
                    flex={1}
                    type={attempts < 2 && !gameOver ? "password" : undefined}
                    />
                </Group>
            </Card>
            <Card title={t("comp_info")} Icon={IoMdPodium}>
                <Group>
                    <TextInput
                    label={t("comp_numb")}
                    value={person?.numberOfCompetitions}
                    readOnly
                    flex={1}
                    type={attempts < 3 && !gameOver ? "password" : undefined}
                    />
                </Group>
            </Card>
            <Card title={t("best_result")} Icon={IoIosStopwatch} h={"200px"}>
                <Table
                columns={cols}
                rows={person?.personal_records || []}
                isLoading={false}
                />
            </Card>
            
        </Stack>
    )
}