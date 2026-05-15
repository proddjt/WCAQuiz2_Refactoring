import { ActionIcon, Group, Stack } from "@mantine/core";
import { FaCircleInfo } from "react-icons/fa6";

interface Props {
    children: React.ReactNode,
    openInfo: () => void,
    isFloating?: boolean
    w?: string
}

export default function Actions({children, openInfo, isFloating, w="100%"} : Props) {
    return (
        <Stack
        w={w}
        gap={10}
        style={{
            position: isFloating ? "sticky" : undefined,
            top: isFloating ? 15 : undefined,
            zIndex: 2,
            backdropFilter: "blur(10px)",
            background: "rgba(20, 20, 20, 0.55)",
            borderRadius: 12,
            padding: "12px 16px",
            border: "1px solid rgba(255,255,255,0.05)",
        }}
        >
            <Group justify="end">
                <ActionIcon onClick={openInfo} size={"xs"} variant="light">
                    <FaCircleInfo size={10}/>
                </ActionIcon>
            </Group>
            {children}
        </Stack>
    )
}