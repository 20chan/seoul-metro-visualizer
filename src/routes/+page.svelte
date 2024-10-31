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

  let currentHour: number | null = $state(null);
  let currentLine: string | null = $state(null);
  let currentStation: [string, string] | null = $state(null);

  const markers = new Map<[string, string], any>();

  let rows = $state.snapshot(data.result.filter(x => x.subwayLine === currentLine || currentLine === null));

  let hours = new Array(24).fill(0).map((_, i) => i);
  let hourCounts = $state(hours.map(hour => {
    return R.sum(rows.flatMap(x => x.times.filter(y => y.hour === hour).map(y => y.on)));
  }));
  let maxHourCount = $state.snapshot(Math.max(...hourCounts));
  const lines = R.uniqueBy(rows, x => x.subwayLine).map(x => x.subwayLine);

  function getHourColor(hour: number) {
    const hourCount = hourCounts[hour];
    return interpolate(['#00A84D', '#F5A200', '#F04938'])(hourCount / maxHourCount);
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
    for (const row of rows) {
      const content = document.createElement('div');
      content.className = 'station-marker';
      content.innerText = row.station;
      content.style.paddingLeft = '0.375rem';
      content.style.paddingRight = '0.375rem';
      content.style.fontSize = '12px';
      content.style.background = 'white';
      content.style.color = 'black';
      content.style.borderRadius = '1.5rem';
      content.style.borderColor = lineColors[row.subwayLine] ?? '#fff';
      content.style.borderWidth = '0.25rem';
      content.style.fontFamily = 'KORAIL';
      content.style.fontSize = '14px';
      content.style.cursor = 'pointer';

      content.onclick = () => {
        if (currentStation === null || currentStation[0] !== row.subwayLine || currentStation[1] !== row.station) {
          currentStation = [row.subwayLine, row.station];
        } else {
          currentStation = null;
        }

        refreshMarkers();
        refreshHours();
      };

      // @ts-ignore
      const overlay = new kakao.maps.CustomOverlay({
        content,
        map,
       // @ts-ignore
        position: new kakao.maps.LatLng(row.coord.y, row.coord.x),
      });

      markers.set([row.subwayLine, row.station], overlay);
    }
  }

  function refreshMarkers() {
    for (const [key, marker] of markers) {
      const [line, station] = key;
      if (currentStation !== null && currentStation[0] === line && currentStation[1] === station) {
        marker.setVisible(true);
      } else if (currentStation !== null) {
        marker.setVisible(false);
      } else {
        if (currentLine === null || currentLine === line) {
          marker.setVisible(true);
        } else {
          marker.setVisible(false);
        }
      }
    }
  }

  function refreshHours() {
    rows = data.result.filter(x => {
      if (currentStation !== null) {
        return x.subwayLine === currentStation[0] && x.station === currentStation[1];
      } else {
        return x.subwayLine === currentLine || currentLine === null
      }
    });
    hourCounts = hours.map(hour => {
      return R.sum(rows.flatMap(x => x.times.filter(y => y.hour === hour).map(y => y.on)));
    });
    maxHourCount = Math.max(...hourCounts);
  }

  onMount(() => {
    map = loadMap();
    loadMarkers();
  })
</script>

<svelte:head>
  <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${PUBLIC_KAKAO_API_KEY}`}></script>
</svelte:head>

<style>
  :global(.station-marker):hover {
    background-color: color-mix(in srgb, yellow 40%, white) !important;
  }
</style>

<div class="w-screen h-screen">
  <div id="map" class="w-full h-full"></div>

  <div class="font-sans z-10 absolute top-10 w-full h-24 flex flex-row gap-x-1 justify-center">
    {#each hours as hour}
      {#key hourCounts}
        <HourBox --color={getHourColor(hour)} disabled={currentHour !== null && hour !== currentHour} on:click={() => {
            if (currentHour === hour) {
              currentHour = null;
            } else {
              currentHour = hour;
            }
          }}>
          <div class="h-full">
            {hour}
          </div>
        </HourBox>
      {/key}
    {/each}
  </div>

  <div class="font-sans z-10 absolute left-8 w-36 top-0 h-screen flex flex-col justify-center gap-y-1">
    {#each lines as line}
      <div>
        <LineLabel --color={lineColors[line] ?? '#fff'} disabled={currentLine != null && line !== currentLine} on:click={() => {
          if (currentLine === line) {
            currentLine = null;
          } else {
            currentLine = line;
          }
          refreshMarkers();
          refreshHours();
        }}>
          {line}
        </LineLabel>
      </div>
    {/each}
  </div>
</div>
