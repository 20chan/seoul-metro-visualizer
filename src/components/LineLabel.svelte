<style>
  .line-label {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    display: inline-block;
    background-color: var(--color, #fff);
    border-radius: 0.5rem;
    font-family: 'KORAIL';
  }

  .line-label:hover, .line-label.disabled {
    background-color: color-mix(in srgb, var(--color, #fff) 40%, transparent)
  }

  .line-label.disabled:hover {
    background-color: var(--color, #fff);
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let disabled: boolean = false;
</script>

<button class={`line-label ${disabled ? 'disabled' : ''}`} on:click={() => dispatch('click')}>
  <slot />
</button>