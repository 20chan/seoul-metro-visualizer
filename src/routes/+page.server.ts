import { getAddress } from '$lib/map';
import { fetchMetro } from '$lib/metro';

export async function load() {
  const date = new Date('2024-10-01');

  const data = await fetchMetro(date);

  const filtered = data.CardSubwayStatsNew.row.filter(x => x.SBWY_ROUT_LN_NM === '2호선');

  const result = await Promise.all(filtered.map(async x => {
    const coord = await getAddress(x.SBWY_STNS_NM, x.SBWY_ROUT_LN_NM);
    return {
      subwayLine: x.SBWY_ROUT_LN_NM,
      station: x.SBWY_STNS_NM,
      coord,
    };
  }));

  return { result };
}