"use client";

import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Box,
} from "@mantine/core";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface InfoCardProps {
  image: string;
  text: string;
  info: string;
  animation: string;
  onClick: () => void;
}

export default function InfoCard({ image, text, info, animation, onClick }: InfoCardProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Card
      radius="md"
      padding={0}
      withBorder
      style={{
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "transform 150ms ease, box-shadow 150ms ease",
      }}
      className={`info-card ${animation}`}
      onClick={onClick}
    >
      {/* Immagine con zoom */}
      <Box
        style={{
          overflow: "hidden",
          height: 220,
        }}
      >
        <Image
          src={image}
          alt={text}
          fit="cover"
          h="100%"
          style={{
            transition: "transform 300ms ease",
          }}
          className="info-card-img"
        />
      </Box>

      {/* Overlay glass + testo centrato */}
      <Box
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "18px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          borderTop: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        <Group justify="center" align="center" gap="xs">
          <Text fw={600} fz="lg" style={{ color: "white" }}>
            {text}
          </Text>

          <Tooltip
            label={info}
            opened={opened}
            withArrow
            multiline
            maw={250}
          >
            <ActionIcon
              variant="transparent"
              color="dark"
              radius="xl"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                setOpened((o) => !o);
              }}
            >
              <FaInfoCircle />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Box>
    </Card>
  );
}
