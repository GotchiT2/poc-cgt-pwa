<script lang="ts">
  import { onMount } from 'svelte';
  import { strapiData, fetchStrapiData } from '../lib/strapi'
  import ArticleCard from '../components/ArticleCard.svelte';

  onMount(fetchStrapiData);
  $: articles = $strapiData;

  
</script>

<main>
  <h1 class="text-center mx-auto my-8 text-4xl font-bold">Articles</h1>
  {#if articles.length > 0}
    <div class="justify-center">
      {#each articles as article}
        <ArticleCard article={article}/>
        <div class="divider w-1/2 mx-auto"></div>
      {/each}
    </div>
  {:else}
    <p>Chargement en cours...</p>
  {/if}
</main>