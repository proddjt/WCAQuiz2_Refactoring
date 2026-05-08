import ModeSelection from "@/components/layout/ModeSelection";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GiItalia } from "react-icons/gi";

export default function FocusPage(){
    const router = useRouter();
    const { t } = useTranslation();

    const startQuiz = (mode: string) => {
        router.push(`/focus/${mode}`);
    }

    return (
        <ModeSelection
        quiz="focus"
        defaultValues={[{key: "IT", label: "it_label", description: "it_desc", icon: GiItalia}]}
        onClick={startQuiz}
        title={t("focus_choose")}
        />
    )
}