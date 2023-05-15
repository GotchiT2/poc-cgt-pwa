require("dotenv").config();
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.VAPI_PUBLIC_KEY,
  process.env.VAPI_PRIVATE_KEY
)
const notify = async (strapi, data) => {
  const users = await strapi.entityService.findMany(
    'api::user-notification-key.user-notification-key', {
    filters: {
      subscription: {
        $notNull: true
      }
    }
  });
  users.forEach(user => {
    setTimeout(() => {
      webpush.sendNotification(
        user.subscription,
        JSON.stringify(data)
      ).then(() => console.log('notification sent')).catch(console.error)
    }, 6000)
  })
}
module.exports = {
  webpush,
  notify,
};