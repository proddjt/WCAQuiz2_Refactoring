import ModeSelection from "@/components/layout/ModeSelection";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GiItalia } from "react-icons/gi";


export default function VersusPage({}){
    const router = useRouter();
    const { t } = useTranslation();

    const startQuiz = (mode: string, event?: string) => {
        if (!event) event = "333-single";
        router.push(`/versus/quiz?mode=${mode}&event=${event?.split("-")[0]}&result=${event?.split("-")[1]}`);
    }

    return (
        <ModeSelection
        quiz="versus"
        defaultValues={[{key: "IT", label: "it_label", description: "it_desc", icon: GiItalia}, {key: "333-single", label: "3x3x3 Cube - Single", icon: "cubing-icon event-333"}]}
        onClick={startQuiz}
        title={t("versus_choose")}
        isMultiple
        />
    )
}