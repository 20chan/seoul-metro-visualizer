import { KAKAO_REST_API_KEY } from '$env/static/private';

export async function getAddress(place: string, line: string): Promise<{ x: number; y: number; } | null> {
  place = place.replace(/\([^)]*\)/g, '');
  place = place.endsWith('역') ? place : `${place}역`;
  const query = `${place} ${line}`;

  const resp = await fetch(`https://dapi.kakao.com/v2/local/search/keyword?query=${query}`, {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`
    },
  });

  const data = await resp.json();
  const find = data.documents.find((x: any) => x.category_group_name === '지하철역');

  if (!find) {
    return null;
  }

  return {
    x: find.x,
    y: find.y,
  };
}