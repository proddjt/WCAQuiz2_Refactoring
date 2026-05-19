'use server'

import { weightedRandomIndex } from "@/utils/functions";
import { safe } from "@/utils/safe";
import dayjs from "dayjs";

export type GoldrushComp = {
  id: string,
  name: string,
  date: string,
  podiums: PodiumType[],
  competitors: {
    count: number,
    competitors: CompetitorType[],
  },
  location: string,
  events: string[],
  time: number,
}

type PodiumType = {
  event: string,
  first: PodiumPersonType | null,
  second: PodiumPersonType | null,
  third: PodiumPersonType | null
}

type PodiumPersonType = {
  id: string,
  position: number,
  best: string,
  average: string
}

type CompetitorType = {
  id: string,
  name: string
}

export const getComp = async (mode: "ez" | "md" | "hd"): Promise<{comp: GoldrushComp | null, error: boolean}> => {
  const unofficialUrl = process.env.NEXT_PUBLIC_UNOFFICIAL_URL;
  const officialUrl = process.env.NEXT_PUBLIC_OFFICIAL_URL;

  const [compsErr, comps] = await safe(`${unofficialUrl}/competitions/IT.json`);
  if (compsErr || !comps || comps.total === 0) return { error: true, comp: null };

  const filteredComps = comps.items.filter(
    (c: { isCanceled: boolean; date: { till: string } }) => !c.isCanceled && dayjs(c.date.till).isBefore(dayjs().subtract(1, "month")),
  );
  if (filteredComps.length === 0) return { error: true, comp: null };

  let gara = null;
  let check = false;
  let count = 0;
  while (!check && count < 30) {
    count += 1;

    let time = 0;
    const randomComp = filteredComps[weightedRandomIndex(filteredComps.length, mode)];

    const [compErr, comp] = await safe(`${officialUrl}/competitions/${randomComp.id}/competitors`);
    if (compErr || !comp || !Array.isArray(comp) || !comp.length) continue;

    if (
      mode == "ez" &&
      (comp.length > 120 || randomComp.name.includes("Italian Championship") || randomComp.name.includes("FMC Italy"))
    ) {
      if (randomComp.events.length >= 10) time = 5;
      else time = randomComp.events.length * 0.5;

    } else if (
      mode == "md" &&
      comp.length >= 60 &&
      !randomComp.name.includes("Italian Championship") &&
      !randomComp.name.includes("FMC Italy") &&
      dayjs(randomComp.date.till).isAfter(dayjs().subtract(7, "year"))
    ) {
      if (randomComp.events.length >= 7) time = 7;
      else time = randomComp.events.length;

    } else if (
      mode === "hd" &&
      comp.length > 2 &&
      comp.length < 60 &&
      !randomComp.name.includes("Italian Championship") &&
      !randomComp.name.includes("FMC Italy")
    ) {
      if (randomComp.events.length > 10) time = 10;
      else time = randomComp.events.length * 1.5;
    }
    console.log(randomComp.name)
    if (time === 0) continue;
    const competitors = comp.map((p: { name: string; id: string }) => ({ name: p.name, id: p.id }));
    const podiums = [];
    for (const event of randomComp.events) {
      const [resultErr, results] = await safe(`${unofficialUrl}/results/${randomComp.id}/${event}.json`);
      if (resultErr || !results || results.total === 0) continue;
      podiums.push({
        event: event,
        first:
          results.items.length > 0
            ? {
                id: results.items[0].personId,
                position: results.items[0].position,
                best: results.items[0].best,
                average: results.items[0].average,
              }
            : null,
        second:
          results.items.length > 1
            ? {
                id: results.items[1].personId,
                position: results.items[1].position,
                best: results.items[1].best,
                average: results.items[1].average,
              }
            : null,
        third:
          results.items.length > 2
            ? {
                id: results.items[2].personId,
                position: results.items[2].position,
                best: results.items[2].best,
                average: results.items[2].average,
              }
            : null,
      });
    }

    gara = {
      id: randomComp?.id,
      name: randomComp?.name,
      date: `${dayjs(randomComp?.date.from).format("DD/MM/YYYY")} - ${dayjs(randomComp?.date.till).format("DD/MM/YYYY")}`,
      podiums: podiums,
      competitors: {
        count: competitors.length,
        competitors: competitors,
      },
      location: randomComp?.city,
      events: randomComp?.events,
      time: time,
    };
    check = true;
  }
  return { comp: gara, error: !gara };
};
