import { Stack } from "@mantine/core";
import ShinyText from "../react-bits/ShinyText";
import { useTranslation } from "react-i18next";

export default function MyLoader(){
    const {t} = useTranslation();
    return (
        <Stack flex={1} justify="center" align="center">
            <ShinyText
            text={t("loading")}
            disabled={false} 
            speed={3} 
            className='loading-text'
            />
        </Stack>
    )
}