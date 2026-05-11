import type { NotificationProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export const showConfirm = (message: string, title?: string, props?: NotificationProps) => notifications.show({
    title: title || "Successo",
    message: message,
    color: "lime",
    ...props
});

export const showInfo = (message: string, title?: string, props?: NotificationProps) => notifications.show({
    title: title || "Info",
    message: message,
    color: "blue",
    ...props
});

export const showError = (message: string, title?: string, props?: NotificationProps) => notifications.show({
    title: title || "Errore",
    message: message,
    color: "red",
    ...props
});

export const showAlert = (message: string, title?: string, props?: NotificationProps) => notifications.show({
    title: title || "Attenzione",
    message: message,
    color: "yellow",
    ...props
});