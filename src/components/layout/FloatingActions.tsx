import { ActionIcon, Group, Stack } from "@mantine/core";
import { FaCircleInfo } from "react-icons/fa6";

export default function FloatingActions({children, openInfo} : {children: React.ReactNode, openInfo: () => void}) {
    return (
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