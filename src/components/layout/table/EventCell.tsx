import { eventMap } from "@/data/eventMap";
import { Group, Text } from "@mantine/core";
import { CustomCellRendererProps } from "ag-grid-react";

export default function EventCell({params, isCensored}: {params: CustomCellRendererProps, isCensored: string | undefined}) {
    return (
        <Group justify="start" align="center" gap={5} className={isCensored}>
            <span className={`cubing-icon event-${params.value}`}></span>
            <Text fz={"sm"} fw={600}>{eventMap.get(params.value)}</Text>
        </Group>
    )
}