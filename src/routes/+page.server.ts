import { getAddress } from '$lib/map';
import { fetchMetroByTime } from '$lib/metro';

export async function load() {
  const date = new Date('2024-09-01');

  const data = await fetchMetroByTime(date);

  const filtered = data.CardSubwayTime.row;

  const result = [];
  for (const x of filtered) {
    const timeKeys = Object.keys(x).filter((x) => x.startsWith('HR_'));
    const times = timeKeys.map((key) => {
      const hour = parseInt(key.split('_')[1]);
      return {
        hour,
        on: x[`HR_${hour}_GET_ON_NOPE`],
        off: x[`HR_${hour}_GET_OFF_NOPE`],
      };
    });

    const coord = await getAddress(x.STTN, x.SBWY_ROUT_LN_NM);
    result.push({
      subwayLine: x.SBWY_ROUT_LN_NM.trim(),
      station: x.STTN.trim(),
      coord,
      times,
    });
  }


  return { result };
}