import { METRO_API_KEY } from '$env/static/private';

const url = `http://openapi.seoul.go.kr:8088/${METRO_API_KEY}/json/CardSubwayStatsNew/1/1000/`

type MetroResp = {
  CardSubwayStatsNew: {
    list_total_count: number;
    RESULT: {
      CODE: string;
      MESSAGE: string;
    };
    row: Array<{
      USE_YMD: string;
      SBWY_ROUT_LN_NM: string;
      SBWY_STNS_NM: string;
      GTON_TNOPE: number;
      GTOFF_TNOPE: number;
      REG_YMD: string;
    }>;
  };
}

type MetroErrorResp = {
  RESULT: {
    CODE: string;
    MESSAGE: string;
  };
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}${month}${day}`;
}

export async function fetchMetro(date: Date): Promise<MetroResp> {
  const res = await fetch(`${url}${formatDate(date)}`);
  const data = await res.json();

  return data;
}