require("dotenv").config();
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.VAPI_PUBLIC_KEY,
  process.env.VAPI_PRIVATE_KEY
)
const notify = async (strapi, data) => {
  console.log(strapi, data)
  const users = await strapi.entityService.findMany(
    'api::user-notification-key.user-notification-key', {
    filters: {
      subscription: {
        $notNull: true
      }
    }
  });
  users.forEach(user => {
      webpush.sendNotification(
        user.subscription,
        JSON.stringify(data)
      ).then(() => console.log('notification sent')).catch(console.error)
    }
  )
}

const addLike = async (strapi, result) => {
  try {
    const idArticle = result.result.id

    const article = await strapi.entityService.findOne('api::article.article', idArticle, {
      fields: ['id', 'likes'],
    });

    // Incrémenter le compteur de likes de l'article
    article.likes = (article.likes || 0) + 1;
    
    await strapi.entityService.update('api::article.article', article.id, article.likes);
    

  } catch (error) {
    console.log('koudur'); 
  }
}

module.exports = {
    async afterCreate(result, data) {
      // Logique à exécuter après la création d'un enregistrement dans la base de données
      notify(strapi, {
        title: `Hi ! Incoming message:`,
        text: "I am PWA PoC ! A notification has a custom image and url.",
      })
    },
};
