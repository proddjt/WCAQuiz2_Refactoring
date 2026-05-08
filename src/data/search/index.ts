import { safe } from "@/utils/safe";

const modeToContinentMap = new Map([
    ["europe", "_Europe"],
    ["asia", "_Asia"],
    ["africa", "_Africa"],
    ["north-america", "_North America"],
    ["south-america", "_South America"]
]);

export async function fetchSearchBar(name: string, mode: string) {
    const url = process.env.NEXT_PUBLIC_OFFICIAL_URL
    const [error, response] = await safe(fetch(`${url}/search/users?q=${name}&persons_table=true`));
    const data = await response.json();
    if (!data?.result || !Array.isArray(data.result) || error) return [];

    if (mode === "world") return data.result
    if (mode === "IT") return data.result.filter((person: Record<string, Record<string, string>>) => person.country?.id === "Italy");

    return data.result.filter((person: Record<string, Record<string, string>>) => person.country?.id === modeToContinentMap.get(mode));
}