//https://api.funtranslations.com/

const { Webhook, WebhookClient } = require("discord.js");

function CreateWebhooks(channel,contentToSend) {
    channel.createWebhook({
        name: 'Yoda',
        avatar: 'http://4.bp.blogspot.com/-wqXJuWSgDSg/TrWGmLDutPI/AAAAAAAAEMg/8djyQy0GyyY/s1600/Yoda_Master_HD_Wallpaper_Vvallpaper.Net.jpg'
    })
        .then(webhook => {
            webhook.send(contentToSend);
        })
        .catch(console.error);
}

function Yoda(message,content) {
    let requestUrl = `https://api.funtranslations.com/translate/yoda.json?text=${content}`;
    
    fetch(requestUrl)
      .then((response) => response.json())
      .then(async (data) => {
        if (data.hasOwnProperty('success')) {
            var translatedContent = data.contents.translated;

            const webhooks = await message.channel.fetchWebhooks();
		    var webhook = webhooks.find(wh => wh.token);
            if (!webhook) {
                webhook = CreateWebhooks(message.channel,translatedContent);
                message.react("✅");
                return;
            }
            
            webhook.send({
                content: translatedContent,
                username: 'Yoda',
                avatarURL: 'http://4.bp.blogspot.com/-wqXJuWSgDSg/TrWGmLDutPI/AAAAAAAAEMg/8djyQy0GyyY/s1600/Yoda_Master_HD_Wallpaper_Vvallpaper.Net.jpg',
            });
            message.react("✅");
        } else {
            message.reply("Sorry, I'm afraid that Yoda currently isn't online.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
module.exports=Yoda;