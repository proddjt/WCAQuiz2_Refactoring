'use client'

import { Button, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Page(){
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <Stack flex={1} justify="center" align="center">
            <Title order={1}>{t("not_found")}</Title>
            <Button onClick={() => router.push("/")}>{t("not_found_btn")}</Button>
        </Stack>
    )
}