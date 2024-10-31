<style>
  .hour-box {
    display: inline-block;
    background-color: var(--color, #fff);
    width: 1.5rem;
    height: full;

    text-align: center;
    cursor: pointer;
  }

  .hour-box:hover, .hour-box.disabled {
    background-color: color-mix(in srgb, var(--color, #fff) 40%, transparent)
  }

  .hour-box.disabled:hover {
    background-color: var(--color, #fff);
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let disabled: boolean = false;
</script>

<button class={`hour-box ${disabled ? 'disabled' : ''}`} on:click={() => dispatch('click')}>
  <slot />
</button>