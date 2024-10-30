<script>
  import "../app.css";
</script>

<style lang='postcss'>
  :global(html) {
    background-color: theme(backgroundColor.h.default);
    color: theme(textColor.h.default);
  }
</style>

<svelte:head>
  <title>서울 지하철 시각화</title>
</svelte:head>

<div class='font-mono'>
  <slot />
</div>
  
