import { getAddress } from '$lib/map';
import { fetchMetro } from '$lib/metro';

export async function load() {
  const date = new Date('2024-10-01');

  const data = await fetchMetro(date);

  const filtered = data.CardSubwayStatsNew.row;

  const result = [];
  for (const x of filtered) {
    const coord = await getAddress(x.SBWY_STNS_NM, x.SBWY_ROUT_LN_NM);
    result.push({
      subwayLine: x.SBWY_ROUT_LN_NM,
      station: x.SBWY_STNS_NM,
      coord,
    });
  }


  return { result };
}