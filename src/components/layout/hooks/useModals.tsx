import { Button, Group, Image, Stack, Text } from "@mantine/core"
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

    return {errorModal, confirmationModal, imgModal, endModal}
}