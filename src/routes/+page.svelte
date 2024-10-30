<script lang="ts">
  import { onMount } from 'svelte';
  import { PUBLIC_KAKAO_API_KEY } from '$env/static/public';

  const { data } = $props();

  let map: any;

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
      const marker = new kakao.maps.Marker({
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
</div>
