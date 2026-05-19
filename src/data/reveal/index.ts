"use server"

import { safe } from "@/utils/safe";
import { eventMap } from "../eventMap";

const pickingMap = new Map([
    ["ez", {min_comp_number: 30, sliceStart: 0, sliceEnd: 19} ],
    ["md", {min_comp_number: 20, sliceStart: 20, sliceEnd: 49} ],
    ["hd", {min_comp_number: 15, sliceStart: 50, sliceEnd: 99} ],
])

export type RevealPerson = {
    id: string,
    name: string,
    country: string,
    country_name: string,
    gender: string,
    numberOfCompetitions: number,
    numberOfChampionships: number,
    competitionIds: string[],
    championshipIds: string[],
    medals: {
        gold: number,
        silver: number,
        bronze: number
    },
    personal_records: Record<string, Record<string, RecordType>>,
    records: {
        national: number,
        continental: number,
        world: number,
        total: number
    },
    avatarUrl: string
}

type RecordType = {
    best: number,
    continent_rank: number,
    country_rank: number,
    world_rank: number
    event_id: string,
    id: number,
    person_id: string,
}

export const getPerson = async (mode: string, difficulty: string): Promise<{person: RevealPerson | null, error: boolean}> => {
    const unofficialUrl = process.env.NEXT_PUBLIC_UNOFFICIAL_URL
    const officialUrl = process.env.NEXT_PUBLIC_OFFICIAL_URL

    const events = Array.from(eventMap.keys())
    const type = ["single", "average"]

    let check = false;
    let person = null
    let count = 0
    while (!check && count < 10) {
        count += 1
        const selectedEvent = events[Math.floor(Math.random()*events.length)]
        let selectedType = type[Math.floor(Math.random()*type.length)]
        if (selectedEvent === "333mbf" && selectedType === "average") selectedType = "single"
        
        const [listErr, list] = await safe(`${unofficialUrl}/rank/${mode}/${selectedType}/${selectedEvent}.json`);
        if (listErr || !list || !list.items || list.items.length === 0) continue

        let tryCount = 0
        const picking = pickingMap.get(difficulty || "md")
        
        while (!person && tryCount < 5) {
            tryCount += 1
            person = await pickFromList(list.items, picking?.min_comp_number, picking?.sliceStart, picking?.sliceEnd)
        }
        if (person) check = true
    }
    if (!check) return {person: null, error: true}

    const [personErr, personData] = await safe(`${officialUrl}/persons/${person.id}`);
    if (personErr || !personData) return {person: null, error: true}
    
    return {
        person: {
            id: personData.person.id,
            name: personData.person.name,
            country: personData.person.country.iso2,
            country_name: personData.person.country.name,
            gender: personData.person.gender,
            numberOfCompetitions: person.numberOfCompetitions,
            numberOfChampionships: person.numberOfChampionships,
            competitionIds: person.competitionIds.sort((a: string, b: string) => {
                const yearA = Number(a.slice(-4));
                const yearB = Number(b.slice(-4));
                return yearB - yearA;
            }),
            championshipIds: person.championshipIds.sort((a: string, b: string) => {
                const yearA = Number(a.slice(-4));
                const yearB = Number(b.slice(-4));
                return yearB - yearA;
            }),
            medals: person.medals,
            personal_records: personData.personal_records,
            records: personData.records,
            avatarUrl: personData.person.avatar.url
        },
        error: false
    }
}

const pickFromList = async (list: Record<string, string>[], min_comp_number: number | undefined, sliceStart: number | undefined, sliceEnd: number | undefined) => {
    if (!min_comp_number || sliceStart === undefined || !sliceEnd || !list?.length) return null
    const unofficialUrl = process.env.NEXT_PUBLIC_UNOFFICIAL_URL
    const personList = list.slice(sliceStart, sliceEnd)
    const id = personList[Math.floor(Math.random()*personList.length)]?.personId
    
    const [personErr, personData] = await safe(`${unofficialUrl}/persons/${id}.json`);
    if (personErr || !personData || personData.competition_count < min_comp_number) return null
    return personData
}