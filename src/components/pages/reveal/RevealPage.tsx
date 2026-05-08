import ModeSelection from "@/components/layout/ModeSelection";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { GiItalia } from "react-icons/gi";


export default function RevealPage({}){
    const router = useRouter();
    const { t } = useTranslation();

    const startQuiz = (mode: string, difficulty?: string) => {
        if (!difficulty) difficulty = "md";
        router.push(`/reveal/${mode}/${difficulty}`);
    }

    return (
        <ModeSelection
        quiz="reveal"
        defaultValues={[{key: "IT", label: "it_label", description: "it_desc", icon: GiItalia}, {key: "md", label: "goldrush_md", description: "goldrush_md_desc", icon: BsEmojiNeutralFill}]}
        onClick={startQuiz}
        title={t("reveal_choose")}
        isMultiple
        />
    )
}