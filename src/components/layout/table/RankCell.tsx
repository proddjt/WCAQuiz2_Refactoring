import { Stack, Text } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";

export default function RankCell({params, isCensored} : {params: CustomCellRendererProps, isCensored: string | undefined}) {
    return (
        <Stack w={"100%"} h={"100%"} justify="center">
            <Text c={params.value === 1 ? 'red' : undefined} size="xs" className={isCensored}>{params.value || "-"}</Text>
        </Stack>
    )
}