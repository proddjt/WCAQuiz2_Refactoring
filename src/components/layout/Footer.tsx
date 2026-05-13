'use client'

import { Anchor, Divider, Group, Text } from "@mantine/core";
import LanguageSelector from "./LanguageSelector";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Footer(){
    const pathname = usePathname();
    const isHome = useMemo(() => pathname === "/", [pathname]);
    
    return (
        <>
        <Group justify="center" align="center" gap={5} pt={isHome ? "sm" : undefined} py={isHome ? undefined : "sm"}>
            <Text size="xs">Powered by: <Anchor href="https://github.com/proddjt">Giovanni Tramontano</Anchor></Text>
            <Divider orientation="vertical" size="xs" />
            <Text size="xs">Graphics by: <Anchor href="mailto:carmen.grav998@gmail.com">Carmen Gravano</Anchor></Text>
        </Group>
        {isHome && <Group justify="center" pb={"sm"}>
            <LanguageSelector/>
        </Group>}
        </>
    )
}