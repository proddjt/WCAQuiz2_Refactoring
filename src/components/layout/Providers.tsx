'use client'

import { ScreenProvider } from "@/context/Screen/ScreenProvider";
import i18n from "@/i18n/i18n";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { I18nextProvider } from "react-i18next";

import {
    ValidationModule,
    ClientSideRowModelModule,
    ModuleRegistry,
    LocaleModule,
    CellStyleModule
} from 'ag-grid-community';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ValidationModule,
    LocaleModule,
    CellStyleModule
]);

export default function Providers({children} : {children: React.ReactNode}) {
    return (
        <I18nextProvider i18n={i18n}>
            <MantineProvider forceColorScheme="dark" theme={{primaryColor: "lime"}}>
                <ModalsProvider modalProps={{
                    centered: true,
                    withCloseButton: false,
                    closeOnClickOutside: false,
                    closeOnEscape: false,
                }}>
                    <ScreenProvider>
                        {children}
                    </ScreenProvider>
                </ModalsProvider>
            </MantineProvider>
        </I18nextProvider>
    )
}