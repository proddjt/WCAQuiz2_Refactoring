import { eventMap } from "@/data/eventMap";
import { Group, Text } from "@mantine/core";

export default function EventCell({event, isCensored}: {event: string, isCensored?: string | undefined}) {
    return (
        <Group justify="start" align="center" gap={5} className={isCensored}>
            <span className={`cubing-icon event-${event}`}></span>
            <Text fz={"sm"} fw={600}>{eventMap.get(event)}</Text>
        </Group>
    )
}