'use server'

import { safe } from "@/utils/safe";

export type VersusPerson = {
    id: string,
    name: string,
    result: number,
    has_avatar: boolean,
    avatarUrl: string,
    country_name: string,
    country_iso: string,
}

export const getPerson = async ({mode, event, result, actualId, previousId}: {mode: string, event: string, result: string, actualId?: string, previousId?: string}): Promise<{person: VersusPerson | null, error: boolean}> => {
    const unofficialUrl = process.env.NEXT_PUBLIC_UNOFFICIAL_URL
    const officialUrl = process.env.NEXT_PUBLIC_OFFICIAL_URL
    
    let person = null
    let check = false;
    let count = 0
    while (!check && count < 10) {
        count += 1
        const [pageErr, pagesRes] = await safe(fetch(`${unofficialUrl}/rank/${mode}/single/333.json`))
        const pages = pagesRes ? await pagesRes.json() : null
        
        if (pageErr || !pages || pages.total === 0) continue

        const totalPages = Math.ceil(pages.total / pages.pagination.size);
        const [listErr, listRes] = await safe(fetch(`${unofficialUrl}/rank/${mode}/single/333.json?page=${Math.floor(Math.random() * totalPages) + 1}`));
        
        const list = listRes ? await listRes.json() : null
        if (listErr || !list || !list.items || list.items.length === 0) continue

        const id = list.items[Math.floor(Math.random()*list.items.length)].personId;
        if (id === actualId || id === previousId) continue
        const [personErr, personRes] = await safe(fetch(`${officialUrl}/persons/${id}`));
        const personData = personRes ? await personRes.json() : null
        if (personErr || !personData || !personData.person || !personData.personal_records || !personData.personal_records[event] || !personData.personal_records[event][result]) continue
        person = {
            id: personData.person.id,
            name: personData.person.name,
            result: personData.personal_records[event][result].best,
            has_avatar: !personData.person.avatar.is_default,
            avatarUrl: personData.person.avatar.url,
            country_name: personData.person.country.name,
            country_iso: personData.person.country.iso2,
        }
        check = true;
    }
    if (!check) return {person: null, error: true}
    return {person, error: false}
}