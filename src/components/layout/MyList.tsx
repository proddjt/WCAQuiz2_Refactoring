'use client'

import { List, ScrollArea } from "@mantine/core";

interface Props {
    list: string[],
    mah?: number | string
    condition?: boolean
}

export default function MyList({list, mah, condition} : Props) {
    return (
        <ScrollArea type="hover" h={mah} offsetScrollbars>
            <List size="sm" listStyleType="disc">
                {!condition && list.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                ))}
            </List>
        </ScrollArea>
    )
}