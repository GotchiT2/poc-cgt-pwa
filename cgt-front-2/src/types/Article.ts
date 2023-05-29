export default interface Article {
  id: number,
  titre: string;
  contenu: string|null;
  dateDePublication: Date;
  imageArticle: string;
  type: string;
  docTelechargeables: string[]|null;
  likes: number;
}