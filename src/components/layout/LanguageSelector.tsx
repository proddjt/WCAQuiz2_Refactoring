import { Select } from "@mantine/core";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const LANGUAGES = [{value: 'en', label: 'English'}, {value: 'it', label: 'Italiano'}]
const COMPACT_LANGUAGES = [{value: 'en', label: 'EN'}, {value: 'it', label: 'IT'}]

export default function LanguageSelector({compact} : {compact?: boolean}) {
    const {i18n} = useTranslation();
    return (
        <Select
        variant={compact ? "light" : "transparent"}
        data={compact ? COMPACT_LANGUAGES : LANGUAGES}
        size={compact ? "xs" : undefined}
        value={i18n.languages[0]}
        onChange={(v) => v && i18n.changeLanguage(v)}
        allowDeselect={false}
        leftSection={<ReactCountryFlag countryCode={i18n.language === "it" ? "IT" : "US"} svg/>}
        w={compact ? "15%" : "35%"}
        />
    )
}