"use client"

import { Button, Group, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { RiHome2Fill, RiRepeatFill } from "react-icons/ri";

export default function Layout({children} : {children: React.ReactNode}) {
  const {t} = useTranslation();
  const router = useRouter();
  return (
    <Stack flex={1} justify="start" gap={0}>
      <Group gap={8} justify="center" py={10}>
        <Button
          variant="outline"
          radius="xl"
          leftSection={<RiHome2Fill size={18} />}
          size="sm"
          onClick={() => router.push("/")}
        >
          {t("home")}
        </Button>

        <Button
          variant="outline"
          radius="xl"
          leftSection={<RiRepeatFill size={18} />}
          size="sm"
          onClick={() => router.back()}
        >
          {t("change_mode")}
        </Button>
      </Group>
      <Stack flex={1}>
        {children}
      </Stack>
    </Stack>
  )
}
