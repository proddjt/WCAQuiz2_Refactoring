import ModeSelection from "@/components/layout/ModeSelection";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { BsEmojiNeutralFill } from "react-icons/bs";

export default function GoldrushPage({}){
    const router = useRouter();
    const { t } = useTranslation();

    const startQuiz = (mode: string) => {
        router.push(`/goldrush/${mode}`);
    }

    return (
        <ModeSelection
        quiz="goldrush"
        defaultValues={[{key: "md", label: "goldrush_md", description: "goldrush_md_desc", icon: BsEmojiNeutralFill}]}
        onClick={startQuiz}
        title={t("goldrush_choose")}
        />
    )
}