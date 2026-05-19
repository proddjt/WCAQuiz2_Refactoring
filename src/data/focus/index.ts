'use server'

import { getBestRankedRecord, RankedResult } from "@/utils/functions";
import { safe } from "@/utils/safe";

export type FocusPerson = {
    id: string,
    name: string,
    country: string,
    country_name: string,
    gender: string,
    numberOfCompetitions: number,
    personal_records: RankedResult[],
    records: {
        national: number,
        continental: number,
        world: number,
        total: number
    },
    avatarUrl: string
}

export const getPerson = async (mode: string): Promise<{person: FocusPerson | null, error: boolean}> => {
    const unofficialUrl = process.env.NEXT_PUBLIC_UNOFFICIAL_URL
    const officialUrl = process.env.NEXT_PUBLIC_OFFICIAL_URL

    let check = false;
    let person = null
    let count = 0
    while (!check && count < 10) {
        count += 1
        const [pageErr, pages] = await safe(`${unofficialUrl}/rank/${mode}/single/333.json`)
        if (pageErr || !pages || pages.total === 0) continue

        const totalPages = Math.ceil(pages.total / pages.pagination.size);
        const [listErr, list] = await safe(`${unofficialUrl}/rank/${mode}/single/333.json?page=${Math.floor(Math.random() * totalPages) + 1}`);
        if (listErr || !list || !list.items || list.items.length === 0) continue

        let tryCount = 0
        while (!person && tryCount < 5) {
            tryCount += 1
            const id = list.items[Math.floor(Math.random()*list.items.length)].personId;
            const [personErr, personData] = await safe(`${officialUrl}/persons/${id}`);
            if (personErr || !personData || personData.competition_count < 15 || personData.person.avatar.is_default) continue

            person = {
                id: personData.person.id,
                name: personData.person.name,
                country: personData.person.country.iso2,
                country_name: personData.person.country.name,
                gender: personData.person.gender,
                numberOfCompetitions: personData.competition_count,
                personal_records: getBestRankedRecord(personData.personal_records),
                records: personData.records,
                avatarUrl: personData.person.avatar.url
            }
        }
        if (person) check = true
    }
    return {person, error: !person ? true : false}
}