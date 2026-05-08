import { Group, Paper, Stack, Text } from "@mantine/core";
import { IconType } from "react-icons";

interface Props {
    title: string,
    children: React.ReactNode,
    Icon: IconType
    h?: string | number
}

export default function Card({title, children, Icon, h} : Props){
    return (
        <Paper withBorder p={"md"} w={"100%"} h={h}>
            <Stack gap={10} h={h ? "100%" : undefined}>
                <Group justify="space-between">
                    <Text fw={600} fz={"xl"}>{title}</Text>
                    <Icon size={20}/>
                </Group>
                {children}
            </Stack>
        </Paper>
    )
}