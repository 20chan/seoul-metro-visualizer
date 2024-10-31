import { KAKAO_REST_API_KEY } from '$env/static/private';
import { prisma } from './prisma';

export async function getAddress(place: string, line: string): Promise<{ x: string; y: string; } | null> {
  const originalPlace = place;

  const cache = await prisma.station.findFirst({
    where: {
      name: place,
      line,
    },
  });

  if (cache) {
    return {
      x: cache.x,
      y: cache.y,
    };
  }

  place = place.replace(/\([^)]*\)/g, '');
  place = place.endsWith('역') ? place : `${place}역`;
  const query = `${place} ${line}`;

  const resp = await fetch(`https://dapi.kakao.com/v2/local/search/keyword?query=${query}`, {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`
    },
  });

  const data = await resp.json();
  let find = data.documents.find((x: any) => x.category_group_name === '지하철역');

  if (!find) {
    const resp2 = await fetch(`https://dapi.kakao.com/v2/local/search/keyword?query=${place}`, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`
      },
    });

    const data2 = await resp2.json();
    find = data2.documents.find((x: any) => x.category_group_name === '지하철역');

    if (!find) {
      console.log(`[getAddress] ${originalPlace} ${line} not found, query: ${query}`);
      return null;
    }
  }

  await prisma.station.create({
    data: {
      name: originalPlace,
      line,
      x: find.x,
      y: find.y,
    },
  });

  return {
    x: find.x,
    y: find.y,
  };
}