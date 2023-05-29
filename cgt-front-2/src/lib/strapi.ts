import { writable } from 'svelte/store';
import Article from '../types/Article';

const MAX_EXCERPT_LENGTH = 100; // Définissez la longueur maximale de l'extrait

// Configuration de l'URL de base de l'API Strapi
const strapiBaseUrl = 'http://localhost:1337';

// Définition d'un store Svelte pour stocker les données récupérées depuis l'API Strapi
export const strapiData = writable<Article[]>([]);
export const selectedArticle = writable<Article|null>();

// Fonction pour récupérer les données depuis l'API Strapi et les stocker dans le store Svelte
export const fetchStrapiData = async () => {
  try {
    const response = await fetch(`${strapiBaseUrl}/api/articles?populate=*`);
    const data = await response.json();
    
    const articles = data.data.map(d => ({
      id: d.id,
      contenu: d.attributes.Contenu ? createExcerpt(d.attributes.Contenu) : null,
      dateDePublication: new Date(d.attributes.DateDePublication),
      titre: d.attributes.Titre,
      imageArticle: strapiBaseUrl+d.attributes.Image.data.attributes.url,
      type: d.attributes.Type,
      docTelechargeables: d.attributes.DocTelechargeables.data ? d.attributes.DocTelechargeables.data.map(doc => strapiBaseUrl+doc.attributes.url) : null,
      likes: d.attributes.likes
    }))
    strapiData.set(articles.sort((a, b) => b.dateDePublication.getTime() - a.dateDePublication.getTime()));
  } catch (error) {
    console.error(error);
  }
};

export const getArticleFromId = async (id:number) => {
  try {
    const response = await fetch(`${strapiBaseUrl}/api/articles/${id}?populate=*`);
    const data = await response.json();
    selectedArticle.set({
      id: data.data.id,
      contenu: data.data.attributes.Contenu,
      dateDePublication: new Date(data.data.attributes.DateDePublication),
      titre: data.data.attributes.Titre,
      imageArticle: strapiBaseUrl+data.data.attributes.Image.data.attributes.formats.thumbnail.url,
      docTelechargeables: data.data.attributes.DocTelechargeables.data ? data.data.attributes.DocTelechargeables.data.map(doc => strapiBaseUrl+doc.attributes.url) : null,
      type: data.data.attributes.Type,
      likes: data.data.attributes.likes
  });
  } catch (error) {
    console.error(error);
  }
  return 0
}

function createExcerpt(contenu: string): string {
  return contenu.length <= MAX_EXCERPT_LENGTH ?
    contenu
    : contenu.substring(0, MAX_EXCERPT_LENGTH) + '...'; 
}
