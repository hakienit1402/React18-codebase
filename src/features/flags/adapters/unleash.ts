// Minimal Unleash proxy adapter (client-side evaluation via proxy)
export type UnleashConfig = {
  url: string; // Unleash proxy URL
  clientKey: string; // proxy client key
  appName?: string;
  environment?: string;
};

export async function fetchUnleashFlags(config: UnleashConfig): Promise<Record<string, boolean>> {
  const res = await fetch(`${config.url}/client/features`, {
    headers: { Authorization: config.clientKey },
  });
  const json = await res.json();
  const out: Record<string, boolean> = {};
  for (const f of json?.features ?? []) {
    out[`FF_${f.name}`] = Boolean(f.enabled);
  }
  return out;
}


