<script lang="ts">
  import { navigate } from 'svelte-navigator'
  import { getArticleFromId } from '../lib/strapi';
  import Article from './article.svelte';
  
  export let article:Article

  function handleClick(idArticle: number) {
    getArticleFromId(idArticle)
    navigate(`/article/${idArticle}`);
  }
</script>

<div class="card layout-base:card-side bg-base-100 shadow-xl mx-16 layout_base:w-1/2 mx-auto">
  <figure class="layout-base:w-1/3"><img src={article.imageArticle} alt=""/></figure>
  <div class="card-body layout-base:w-2/3">
    <h2 class="card-title">{article.titre}</h2>
    <div class="flex">
      <div class="badge badge-secondary">{article.type}</div>
      <div class="badge badge-outline ml-2">{article.dateDePublication.toLocaleDateString('FR-fr')}</div>
    </div>
    {#if article.contenu}
       <p>{article.contenu}</p>
    {/if}
    <div class="card-actions items-center justify-between">
      <div class="text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        <span>{article.likes}</span>
      </div>
      <button class="btn btn-primary max-w-xs" on:click={() => handleClick(article.id)}>Lire l'article</button>
    </div>
  </div>
</div>
