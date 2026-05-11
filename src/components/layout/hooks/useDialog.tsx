import { Button, Dialog, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

export default function useDialog(){
    const [opened, { toggle, close }] = useDisclosure(false);
    const {t} = useTranslation();

    const ConnectionDialog = () => (
        <Dialog opened={opened} withCloseButton onClose={close} size="md">
            <Text size="md" mb="xs" fw={500}>
                {t("loading_error")}
            </Text>
            <Group align="flex-end">
                <Button onClick={() => {window.location.reload();close();}}>{t("reload_btn")}</Button>
            </Group>
        </Dialog>
    )
    
    return {ConnectionDialog, toggle, opened}
}