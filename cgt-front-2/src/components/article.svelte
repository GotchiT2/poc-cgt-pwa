<script lang="ts">
  import { selectedArticle } from "../lib/strapi";
  import LikeButton from './LikeBtn.svelte';

  let isLiked = false;

  async function addLike() {
    try {
      const response = await fetch(`http://localhost:1337/api/articles/${$selectedArticle.id}/add-like`, {
        method: 'PUT'
      });

      if (response.ok) {
        // Mise à jour de l'article avec le nouveau nombre de likes
        $selectedArticle = {
          ...$selectedArticle,
          likes: $selectedArticle.likes + 1
        };
      } else {
        // Gérer les erreurs si nécessaire
        console.error('Une erreur s\'est produite lors de l\'ajout du like.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout du like.', error);
    }
  }

  function handleDownload(url:string) {
    window.open(url, '_blank');
  }
</script>

{#if $selectedArticle}
<div class="px-4 mb-4">
  <h1 class="text-center mx-auto my-8 text-4xl font-bold">{$selectedArticle.titre}</h1>
  <div class="flex mb-2">
    <span>{$selectedArticle.dateDePublication.toLocaleDateString('FR-fr')}</span>
    <div class="badge badge-secondary">{$selectedArticle.type}</div>
  </div>
    <img class="mx-auto mb-2" src={$selectedArticle.imageArticle} alt="" />  
    <p>
      {$selectedArticle.contenu}
    </p>

  <div class="card-actions items-center justify-between">
    <div class="text-primary">
      <LikeButton on:like={addLike} />
      <span>{$selectedArticle.likes}</span>
    </div>
  </div>
  {#if $selectedArticle.docTelechargeables}
     <!-- content here -->
     {#each $selectedArticle.docTelechargeables as doc}
       <button class="btn gap-2 mx-auto" on:click={handleDownload(doc)}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/> </svg>
         Télécharger le pdf
       </button>
     {/each}
  {/if}
</div>
{/if}
