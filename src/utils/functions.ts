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

export function formatTime(value: number | string, eventId: string): string {
    const str = value?.toString();

    // Caso speciale: 333mbd (Multi-Blind)
    if (eventId === "333mbf") {
        const padded = str.padStart(9, '0');
        const DD = parseInt(padded.slice(0, 2), 10);
        const TTTTT = parseInt(padded.slice(2, 7), 10);
        const MM = parseInt(padded.slice(7, 9), 10);

        const difference = 99 - DD;
        const missed = MM;
        const solved = difference + missed;
        const attempted = solved + missed;

        const minutes = Math.floor(TTTTT / 60);
        const seconds = TTTTT % 60;

        return `${solved}/${attempted} ${minutes}:${seconds.toString().padStart(2, '0')}`;
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
