<script lang="ts">
  import * as R from 'remeda';
  import interpolate from 'color-interpolate';
  import { onMount } from 'svelte';
  import { PUBLIC_KAKAO_API_KEY } from '$env/static/public';
  import { lineColors } from '$lib/metroHelper';
  import LineLabel from '../components/LineLabel.svelte';
    import HourBox from '../components/HourBox.svelte';

  const { data } = $props();

  let map: any;

  const hours = new Array(24).fill(0).map((_, i) => i);
  const hourCounts = hours.map(hour => {
    return R.sum(data.result.flatMap(x => x.times.filter(y => y.hour === hour).map(y => y.on)));
  });
  const maxHourCount = Math.max(...hourCounts);
  const lines = R.uniqueBy(data.result, x => x.subwayLine).map(x => x.subwayLine);

  function getHourColor(hour: number) {
    const hourCount = hourCounts[hour];
    return interpolate(['green', 'red'])(hourCount / maxHourCount);
  }

  function loadMap() {
    const container = document.getElementById('map');
    const options = {
      // @ts-ignore
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 6,
    };
    // @ts-ignore
    return new kakao.maps.Map(container, options);
  }

  function loadMarkers() {
    const rows = data.result;

    for (const row of rows) {
      // @ts-ignore
      const overlay = new kakao.maps.CustomOverlay({
        content: `
          <div style="
            padding: 5px;
            font-size: 12px;
            background: ${lineColors[row.subwayLine] ?? '#fff'};
            color: white;
            border-radius: 0.25rem;
          ">
            ${row.station}
          </div>
        `,
        map,
       // @ts-ignore
        position: new kakao.maps.LatLng(row.coord.y, row.coord.x),
      });
    }
  }

  onMount(() => {
    map = loadMap();
    loadMarkers();
  })
</script>

<svelte:head>
  <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${PUBLIC_KAKAO_API_KEY}`}></script>
</svelte:head>

<div class="w-screen h-screen">
  <div id="map" class="w-full h-full"></div>

  <div class="font-sans z-10 absolute top-10 w-full h-48 flex flex-row gap-x-1.5 justify-center">
    {#each hours as hour}
      <div class="text-white">
        <HourBox --color={getHourColor(hour)}>
          {hour}
        </HourBox>
      </div>
    {/each}
  </div>

  <div class="font-sans z-10 absolute right-8 w-36 top-0 h-screen flex flex-col justify-center gap-y-1">
    {#each lines as line}
      <div class="text-right">
        <LineLabel --color={lineColors[line] ?? '#fff'}>
          {line}
        </LineLabel>
      </div>
    {/each}
  </div>
</div>
