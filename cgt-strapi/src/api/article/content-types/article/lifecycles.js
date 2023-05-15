module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      // Logique à exécuter après la création d'un enregistrement dans la base de données
      console.log('Nouvel enregistrement créé :', result);

      // Exécutez votre code supplémentaire ici...
    },
  },
};

