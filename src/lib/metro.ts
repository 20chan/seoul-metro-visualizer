import { METRO_API_KEY } from '$env/static/private';

const urlStats = `http://openapi.seoul.go.kr:8088/${METRO_API_KEY}/json/CardSubwayStatsNew/1/1000/`
const urlTime = `http://openapi.seoul.go.kr:8088/${METRO_API_KEY}/json/CardSubwayTime/1/1000/`

type MetroStatsResp = {
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

type MetroTimeResp = {
  CardSubwayTime: {
    list_total_count: number;
    RESULT: {
      CODE: string;
      MESSAGE: string;
    };
    row: Array<{
      USE_YMD: string;
      SBWY_ROUT_LN_NM: string;
      STTN: string;
      [key: `HR_${number}_GET_ON_NOPE`]: number;
      [key: `HR_${number}_GET_OFF_NOPE`]: number;
      JOB_YMD: string;
    }>;
  };
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');

  return `${year}${month}`;
}

export function formatFullDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}${month}${day}`;
}

export async function fetchMetroStats(date: Date): Promise<MetroStatsResp> {
  const res = await fetch(`${urlStats}${formatFullDate(date)}`);
  const data = await res.json();

  return data;
}

export async function fetchMetroByTime(date: Date): Promise<MetroTimeResp> {
  const res = await fetch(`${urlTime}${formatDate(date)}`);
  const data = await res.json();

  return data;
}