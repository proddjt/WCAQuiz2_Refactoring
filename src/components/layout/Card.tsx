'use client'

import { Group, Paper, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  children: React.ReactNode;
  Icon: IconType;
  h?: string | number;
  animation?: string;
  assignRef?: (el: HTMLElement | null) => void
}

const colors = ["#FA5252", "#FD7E14", "#FAB005", "#40C057", "#228BE6", "#F8F9FA"];

export default function Card({ title, children, Icon, h, animation, assignRef }: Props) {
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        setTimeout(() => setColor(colors[Math.floor(Math.random() * colors.length)]), 0);
    }, []);

    return (
        <Paper
        withBorder
        p={"md"}
        w={"100%"}
        h={h}
        className={animation}
        style={{
            borderColor: color,
            boxShadow: `0 0 8px 2px ${color}40`, // 40 = 25% opacity
        }}
        ref={assignRef}
        >
        <Stack gap={10} h={h ? "100%" : undefined}>
            <Group justify="space-between">
            <Text fw={600} fz={"xl"}>
                {title}
            </Text>
            <Icon size={20} color={color}/>
            </Group>
            {children}
        </Stack>
        </Paper>
    );
    }
