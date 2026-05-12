import { List, ScrollArea } from "@mantine/core";

interface Props {
    list: string[],
    mah?: number | string
    condition?: boolean
}

export default function MyList({list, mah, condition} : Props) {
    return (
        <List size="sm">
            <ScrollArea type="hover" h={mah} offsetScrollbars>
                {!condition && list.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                ))}
            </ScrollArea>
        </List>
    )
}