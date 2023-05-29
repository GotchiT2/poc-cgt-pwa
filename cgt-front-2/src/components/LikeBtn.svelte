<script>
  import { createEventDispatcher } from 'svelte';

  export let liked = false; // Propriété pour stocker l'état du bouton de like
  const dispatch = createEventDispatcher();

  function handleClick() {
    liked = !liked; // Inverse l'état du bouton de like
    dispatch('like', liked); // Émet un événement 'like' en passant l'état actuel du bouton
  }
</script>

<button on:click={handleClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current ${liked ? 'fill-current' : 'fill-white'}"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
</button>
