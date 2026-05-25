export interface RankedResult {
  country_rank: number;
  continent_rank: number;
  world_rank: number;
  best: number;
  type: 'single' | 'average';
}

export interface PersonalRecord {
  single?: Omit<RankedResult, 'type'>;
  average?: Omit<RankedResult, 'type'>;
}

export const preferredOrder = [
  "333", "222", "444", "555", "666", "777",
  "333bf", "333fm", "333oh", "clock", "minx",
  "pyram", "skewb", "sq1", "444bf", "555bf", "333mbf", "333ft", "magic", "mmagic"
];

export function getBestRankedRecord(personalRecords: Record<string, PersonalRecord>): RankedResult[] {
  const allRecords: RankedResult[] = Object.values(personalRecords)
    .flatMap(event => [
      event.single && { ...event.single, type: 'single' as const },
      event.average && { ...event.average, type: 'average' as const }
    ])
    .filter(Boolean) as RankedResult[];

  const eff = (rank: number) => (rank === 0 ? Infinity : rank);

  allRecords.sort((a, b) => {
    return (
      eff(a.country_rank) - eff(b.country_rank) ||
      eff(a.continent_rank) - eff(b.continent_rank) ||
      eff(a.world_rank) - eff(b.world_rank)
    );
  });

  const best = allRecords[0];
  const bestCountry = eff(best.country_rank);
  const bestContinent = eff(best.continent_rank);
  const bestWorld = eff(best.world_rank);

  return allRecords.filter(r =>
    eff(r.country_rank) === bestCountry &&
    eff(r.continent_rank) === bestContinent &&
    eff(r.world_rank) === bestWorld
  );
}

export function formatSecondsTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}

export function getImageStyle(attempts: number): React.CSSProperties {
  const blurMap: Record<string, string> = {
    "2xl": "20px",
    "xl": "12px",
    "md": "8px",
    "sm": "4px",
    "xs": "2px",
  };

  let blur = "none";

  if (attempts < 2) blur = blurMap["2xl"];
  else if (attempts < 3) blur = blurMap["xl"];
  else if (attempts < 4) blur = blurMap["md"];
  else if (attempts < 5) blur = blurMap["sm"];
  else if (attempts < 6) blur = blurMap["xs"];
  else blur = "none";

  const grayscale = attempts < 2 ? "grayscale(1)" : "";

  return {
    filter: `${grayscale} blur(${blur})`,
    transition: "filter 200ms ease",
  };
}

export function formatTime(value: number | string, eventId: string): string | null {
    const str = value?.toString();
    if (!str) return "-";
    // Caso speciale: 333mbd (Multi-Blind)
    if (eventId === "333mbf") {
        const str = value.toString().padStart(8, "0");
        let TTTTT;
        let solved
        let attempted
        // OLD FORMAT: 1SSAATTTTT (10 digits)
        if (str.length === 10 && str.startsWith("1")) {
            const time = parseInt(str.slice(5, 10), 10);

            if (time === 99999) return null; // unknown time

            TTTTT = time
            solved = (99 - +str.slice(1, 3))
            attempted = str.slice(3, 5)
        }

        // NEW FORMAT: DDTTTTTMM (9 digits)
        if (str.length === 9) {
            const time = parseInt(str.slice(2, 7));

            if (time === 99999) return null; // unknown time

            TTTTT = time
            const difference = (99 - +str.slice(0, 2))
            solved = (difference + +str.slice(-2))
            attempted = (solved + +str.slice(-2))
        }

        if (!TTTTT) return null; // formato non valido

        const hours = Math.floor(TTTTT / 3600);
        const minutes = Math.floor((TTTTT % 3600) / 60);
        const seconds = TTTTT % 60;

        const timeString =
          hours > 0
            ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`
            : `${minutes}:${seconds.toString().padStart(2, "0")}`;

        return `${solved}/${attempted} ${timeString}`;
      }
    
    // Caso speciale: 333fm
    if (eventId === "333fm") {
        if (str.length === 4) {
            return `${str.slice(0, -2)}.${str.slice(-2)}`;
        } else if (str.length === 2) {
            return str;
        } else {
            return str;
        }
    }

    // Formattazione standard in centisecondi
    const centiseconds = typeof value === 'number' ? value : parseInt(value, 10);

    const hours = Math.floor(centiseconds / 360000);
    const minutes = Math.floor((centiseconds % 360000) / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const hundredths = centiseconds % 100;

    const cs = hundredths.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${m}:${s}.${cs}`;
    } else if (minutes > 0) {
        return `${minutes}:${s}.${cs}`;
    } else {
        return `${seconds}.${cs}`;
    }
}

export function decodeMBF(value: number): number | null {
    const str = value.toString().padStart(8, "0");

    // OLD FORMAT: 1SSAATTTTT (10 digits)
    if (str.length === 10 && str.startsWith("1")) {
        const TTTTT = parseInt(str.slice(5, 10), 10);

        if (TTTTT === 99999) return null; // unknown time

        return TTTTT; // seconds
    }

    // NEW FORMAT: DDTTTTTMM (9 digits)
    if (str.length === 9) {
        const TTTTT = parseInt(str.slice(2, 7));

        if (TTTTT === 99999) return null; // unknown time

        return TTTTT; // seconds
    }

    return null; // formato non valido
}

export function sortEventDataAsArray(data: Record<string, unknown>): unknown[] {

  const allKeys = Object.keys(data);

  const sortedKeys = allKeys.sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);

    const isAInPreferred = indexA !== -1;
    const isBInPreferred = indexB !== -1;

    if (isAInPreferred && isBInPreferred) {
      return indexA - indexB;
    } else if (isAInPreferred) {
      return -1;
    } else if (isBInPreferred) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });

  const result: unknown[] = sortedKeys.map((key) => {
    return { ...data[key] as object, event_name: key };
  });

  return result;
}

export function checkLower(a: number, b: number) {
  return a < b;
}

export function weightedRandomIndex(length: number, difficulty: string) {
    const weights = [];
    for (let i = 0; i < length; i++) {
        if (difficulty == "hd") weights[i] = i > (2 * length) / 3 ? 3 : 1;
        else weights[i] = 1
    }
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    let random = Math.random() * totalWeight;

    for (let i = 0; i < length; i++) {
        if (random < weights[i]) return i;
        random -= weights[i];
    }

    return length - 1;
}

export const checkPercentage = (total: number, value: number, percentage: number) => {
  const target = total * (percentage / 100);
  const tolerance = Math.max(1, target * 0.05); 
  return Math.abs(value - target) <= tolerance;
}

