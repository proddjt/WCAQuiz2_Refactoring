import { IconType } from "react-icons";
import { BsEmojiAngryFill, BsEmojiNeutralFill, BsEmojiSmileFill } from "react-icons/bs";
import { GiItalia } from "react-icons/gi";
import { LiaGlobeAfricaSolid, LiaGlobeAmericasSolid, LiaGlobeAsiaSolid, LiaGlobeEuropeSolid, LiaGlobeSolid } from "react-icons/lia";

export const getModes = (quiz: string) => modes.get(quiz);

const modes = new Map([
    [
        "focus",
        {
            first:
                [
                    {key: "IT", label: "it_label", description: "it_desc", icon: GiItalia},
                    {key: "europe", label: "eu_label", description: "eu_desc", icon: LiaGlobeEuropeSolid},
                    {key: "asia", label: "as_label", description: "as_desc", icon: LiaGlobeAsiaSolid},
                    {key: "africa", label: "af_label", description: "af_desc", icon: LiaGlobeAfricaSolid},
                    {key: "north-america", label: "na_label", description: "na_desc", icon: LiaGlobeAmericasSolid},
                    {key: "south-america", label: "sa_label", description: "sa_desc", icon: LiaGlobeAmericasSolid},
                    {key: "world", label: "wo_label", description: "world_desc", icon: LiaGlobeSolid},
                ]
        }
    ],
    [
        "goldrush",
        {
            first:
                [
                    {key: "ez", label: "goldrush_ez", description: "goldrush_ez_desc", icon: BsEmojiSmileFill},
                    {key: "md", label: "goldrush_md", description: "goldrush_md_desc", icon: BsEmojiNeutralFill},
                    {key: "hd", label: "goldrush_hd", description: "goldrush_hd_desc", icon: BsEmojiAngryFill},
                ]
        }
    ],
    [
        "reveal",
        {
            first: 
                [
                    {key: "IT", label: "it_label", description: "it_desc", icon: GiItalia},
                    {key: "europe", label: "eu_label", description: "eu_desc", icon: LiaGlobeEuropeSolid},
                    {key: "asia", label: "as_label", description: "as_desc", icon: LiaGlobeAsiaSolid},
                    {key: "africa", label: "af_label", description: "af_desc", icon: LiaGlobeAfricaSolid},
                    {key: "north-america", label: "na_label", description: "na_desc", icon: LiaGlobeAmericasSolid},
                    {key: "south-america", label: "sa_label", description: "sa_desc", icon: LiaGlobeAmericasSolid},
                    {key: "world", label: "wo_label", description: "world_desc", icon: LiaGlobeSolid},
                ],
            second: 
                [
                    {key: "ez", label: "reveal_ez", description: "reveal_ez_desc", icon: BsEmojiSmileFill},
                    {key: "md", label: "reveal_md", description: "reveal_md_desc", icon: BsEmojiNeutralFill},
                    {key: "hd", label: "reveal_hd", description: "reveal_hd_desc", icon: BsEmojiAngryFill},
                ]
        }
    ],
    [
        "versus",
        {
            first:
                [
                    {key: "IT", label: "it_label", description: "it_desc", icon: GiItalia},
                    {key: "europe", label: "eu_label", description: "eu_desc", icon: LiaGlobeEuropeSolid},
                    {key: "asia", label: "as_label", description: "as_desc", icon: LiaGlobeAsiaSolid},
                    {key: "africa", label: "af_label", description: "af_desc", icon: LiaGlobeAfricaSolid},
                    {key: "north-america", label: "na_label", description: "na_desc", icon: LiaGlobeAmericasSolid},
                    {key: "south-america", label: "sa_label", description: "sa_desc", icon: LiaGlobeAmericasSolid},
                    {key: "world", label: "wo_label", description: "world_desc", icon: LiaGlobeSolid},
                ],
            second: 
                [
                    {key: "333-single", label: "3x3x3 Cube - Single", icon: "cubing-icon event-333"},
                    {key: "333-average", label: "3x3x3 Cube - Average", icon: "cubing-icon event-333"},
                    {key: "222-single", label: "2x2x2 Cube - Single", icon: "cubing-icon event-222"},
                    {key: "222-average", label: "2x2x2 Cube - Average", icon: "cubing-icon event-222"},
                    {key: "444-single", label: "4x4x4 Cube - Single", icon: "cubing-icon event-444"},
                    {key: "444-average", label: "4x4x4 Cube - Average", icon: "cubing-icon event-444"},
                    {key: "555-single", label: "5x5x5 Cube - Single", icon: "cubing-icon event-555"},
                    {key: "555-average", label: "5x5x5 Cube - Average", icon: "cubing-icon event-555"},
                    {key: "666-single", label: "6x6x6 Cube - Single", icon: "cubing-icon event-666"},
                    {key: "666-average", label: "6x6x6 Cube - Average", icon: "cubing-icon event-666"},
                    {key: "777-single", label: "7x7x7 Cube - Single", icon: "cubing-icon event-777"},
                    {key: "777-average", label: "7x7x7 Cube - Average", icon: "cubing-icon event-777"},
                    {key: "333bf-single", label: "3x3x3 Blindfolded - Single", icon: "cubing-icon event-333bf"},
                    {key: "333bf-average", label: "3x3x3 Blindfolded - Average", icon: "cubing-icon event-333bf"},
                    {key: "333fm-single", label: "3x3x3 Fewest Moves - Single", icon: "cubing-icon event-333fm"},
                    {key: "333fm-average", label: "3x3x3 Fewest Moves - Average", icon: "cubing-icon event-333fm"},
                    {key: "333oh-single", label: "3x3x3 One-Handed - Single", icon: "cubing-icon event-333oh"},
                    {key: "333oh-average", label: "3x3x3 One-Handed - Average", icon: "cubing-icon event-333oh"},
                    {key: "clock-single", label: "Clock - Single", icon: "cubing-icon event-clock"},
                    {key: "clock-average", label: "Clock - Average", icon: "cubing-icon event-clock"},
                    {key: "minx-single", label: "Megaminx - Single", icon: "cubing-icon event-minx"},
                    {key: "minx-average", label: "Megaminx - Average", icon: "cubing-icon event-minx"},
                    {key: "pyram-single", label: "Pyraminx - Single", icon: "cubing-icon event-pyram"},
                    {key: "pyram-average", label: "Pyraminx - Average", icon: "cubing-icon event-pyram"},
                    {key: "skewb-single", label: "Skewb - Single", icon: "cubing-icon event-skewb"},
                    {key: "skewb-average", label: "Skewb - Average", icon: "cubing-icon event-skewb"},
                    {key: "sq1-single", label: "Square-1 - Single", icon: "cubing-icon event-sq1"},
                    {key: "sq1-average", label: "Square-1 - Average", icon: "cubing-icon event-sq1"}
                ]
        }
    ]
])

export type Mode = {
    key: string;
    label: string;
    description?: string;
    icon: IconType | string
}