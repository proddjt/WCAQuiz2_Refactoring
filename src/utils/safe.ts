export const safe = async (url: string, init?: RequestInit) => {
  try {
    const res = await fetch(url, init);
    if (!res.ok) return [new Error(`HTTP ${res.status}`), null] as const;

    try {
      const json = await res.json();
      return [null, json] as const;
    } catch (err) {
      return [err, null] as const;
    }
  } catch (err) {
    return [err, null] as const;
  }
};
