// Minimal LaunchDarkly adapter sketch (server SDK or client SDK initialization
// should be done outside; here we just define the interface)

export type LDClient = {
  variation: (flagKey: string, defaultValue: boolean) => Promise<boolean> | boolean;
};

export async function fetchLDFlags(client: LDClient, keys: string[]): Promise<Record<string, boolean>> {
  const out: Record<string, boolean> = {};
  for (const key of keys) {
    out[`FF_${key}`] = Boolean(await client.variation(key, false));
  }
  return out;
}


