import { Button, Group, Image, Stack, Table, Text, Title } from "@mantine/core"
import { modals } from "@mantine/modals"
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next"

export default function useModals(){
    const {t} = useTranslation();

    const errorModal = () => {
        const id = modals.open({
            children:
            <Stack gap={10}>
                <Text fw={600} fz={"md"}>{t("error_modal_desc_1")}</Text>
                <Text fz={"md"}>{t("error_modal_desc_2")}</Text>
                <Group justify="end">
                    <Button onClick={() => {modals.close(id); window.location.reload()}} color="red" variant="light">{t("reload")}</Button>
                </Group>
            </Stack>
        })
    }

    const endModal = (title: string, text: string) => {
        const id = modals.open({
            children:
            <Stack gap={10}>
                <Text fw={600} fz={"md"}>{title}</Text>
                <Text fz={"md"}>{text}</Text>
                <Group justify="end">
                    <Button onClick={() => modals.close(id)} color="red" variant="light">{t("close")}</Button>
                </Group>
            </Stack>
        })
    }

    const confirmationModal = (text: string, onConfirm: () => void) => {
        const id = modals.openConfirmModal({
            children: <Text>{text}</Text>,
            labels: {confirm: t("confirm"), cancel: t("cancel")},
            cancelProps: {color: "red", variant: "light"},
            onCancel: () => modals.close(id),
            onConfirm: () => {modals.close(id); onConfirm()}
        })
    }

    const imgModal = (url: string, style: CSSProperties) => {
        const id = modals.open({
            children:
            <Stack gap={10} align="center">
                <Image src={url} alt="Quiz image" style={style} w={"100%"}/>
                <Group justify="end" w={"100%"}>
                    <Button onClick={() => modals.close(id)} color="red" variant="light">{t("close")}</Button>
                </Group>
            </Stack>
        })
    }

    const focusModal = () => {
        const id = modals.open({
            children:
            <Stack gap={5}>
                <Title order={2}>{t("focus_modal_title")}</Title>
                <Text fw={700} fz={"md"}>{t("focus_modal_heading_1")}</Text>
                <Text pb={10}>{t("focus_modal_desc_1")}</Text>
                <Text fw={700} fz={"md"}>{t("focus_modal_heading_2")}</Text>
                <Text pb={10}>{t("focus_modal_desc_2")}</Text>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t("attempt")}</Table.Th>
                            <Table.Th>{t("points")}</Table.Th>
                            <Table.Th>{t("info_revealed")}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>{t("1")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 5})}</Table.Td>
                            <Table.Td>{t("focus_modal_table_1_desc_1")} <i>{t("focus_modal_table_1_desc_2")}</i>{t("focus_modal_table_1_desc_3")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("2")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 4})}</Table.Td>
                            <Table.Td>{t("focus_modal_table_2_desc_1")} <i>{t("focus_modal_table_2_desc_2")} <strong>{t("focus_modal_table_2_desc_3")}</strong> {t("focus_modal_table_2_desc_4")}</i>{t("focus_modal_table_2_desc_5")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("3")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 3})}</Table.Td>
                            <Table.Td>{t("focus_modal_table_3_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("4")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 2})}</Table.Td>
                            <Table.Td>{t("focus_modal_table_4_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("5")}</Table.Td>
                            <Table.Td>{t("1_pt")}</Table.Td>
                            <Table.Td>{t("focus_modal_table_5_desc_1")}</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <Text fw={700} fz={"md"}>{t("focus_modal_heading_3")}</Text>
                <Text pb={10}>{t("focus_modal_desc_3_1")}</Text>
                <Text pb={10}>{t("focus_modal_desc_3_2")}</Text>
                <Group justify="end" w={"100%"}>
                    <Button onClick={() => modals.close(id)} color="red" variant="light">{t("close")}</Button>
                </Group>
            </Stack>
        })
    }

    const revealModal = () => {
        const id = modals.open({
            children:
            <Stack gap={5}>
                <Title order={2}>{t("reveal_modal_title")}</Title>
                <Text fw={700} fz={"md"}>{t("reveal_modal_heading_1")}</Text>
                <Text pb={10}>{t("reveal_modal_desc_1")}</Text>
                <Text fw={700} fz={"md"}>{t("reveal_modal_heading_2")}</Text>
                <Text pb={10}>{t("reveal_modal_desc_2")}</Text>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t("attempt")}</Table.Th>
                            <Table.Th>{t("points")}</Table.Th>
                            <Table.Th>{t("info_revealed")}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>{t("1")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 10})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_1_desc_1")} <i>{t("reveal_modal_table_1_desc_2")}</i></Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("2")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 9})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_2_desc_1")} <i>{t("reveal_modal_table_2_desc_2")} <strong>{t("reveal_modal_table_2_desc_3")}</strong> {t("reveal_modal_table_2_desc_4")}</i></Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("3")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 8})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_3_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("4")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 7})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_4_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("5")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 6})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_5_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("6")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 5})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_6_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("7")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 4})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_7_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("8")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 3})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_8_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("9")}</Table.Td>
                            <Table.Td>{t("n_pts", {points: 2})}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_9_desc_1")}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t("10")}</Table.Td>
                            <Table.Td>{t("1_pt")}</Table.Td>
                            <Table.Td>{t("reveal_modal_table_10_desc_1")}</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <Text fw={700} fz={"md"}>{t("reveal_modal_heading_3")}</Text>
                <Text pb={10}>{t("reveal_modal_desc_3_1")}</Text>
                <Text pb={10}>{t("reveal_modal_desc_3_2")}</Text>
                <Group justify="end" w={"100%"}>
                    <Button onClick={() => modals.close(id)} color="red" variant="light">{t("close")}</Button>
                </Group>
            </Stack>
        })
    }

    const versusModal = () => {
        const id = modals.open({
            children:
            <Stack gap={5}>
                <Title order={2}>{t("versus_modal_title")}</Title>
                <Text fw={700} fz={"md"}>{t("versus_modal_heading_1")}</Text>
                <Text pb={10}>{t("versus_modal_desc_1")}</Text>
                <Text pb={10}>{t("versus_modal_desc_2")}</Text>
                <Text pb={10}>{t("versus_modal_desc_3")}</Text>
                <Group justify="end" w={"100%"}>
                    <Button onClick={() => modals.close(id)} color="red" variant="light">{t("close")}</Button>
                </Group>
            </Stack>
        })
    }

    return {errorModal, confirmationModal, imgModal, endModal, focusModal, revealModal, versusModal}
}