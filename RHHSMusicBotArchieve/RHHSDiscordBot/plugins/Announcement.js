const { EmbedBuilder, time } = require('discord.js');

function CreateEmbed(desc,senderObj) {
    var InfoEmbed = new EmbedBuilder()
             	.setColor(0x00CCCC)
	            .setTitle("Announcement")
             	.setURL('')
            	.setAuthor({ name: "System Announcement", iconURL: "https://yt3.googleusercontent.com/ytc/AIdro_mjqpFe6hW6BhsOGDlQ1FD3CsSduQHiIcYVqBXQyLx8M0o=s160-c-k-c0x00ffffff-no-rj", url: 'http://www.rhhsmusic.xyz/' })
	            .setDescription(desc)
	           // .setTimestamp()
	            .setFooter({ text: 'RHHS Music Council 2023-2024', iconURL: 'https://yt3.googleusercontent.com/ytc/AIdro_mjqpFe6hW6BhsOGDlQ1FD3CsSduQHiIcYVqBXQyLx8M0o=s160-c-k-c0x00ffffff-no-rj' });
    return InfoEmbed;
}

function SendAnnouncement(client,message,User_Inst) {
    let Arg1 = message.content.substring(10,message.content.length);
    
    client.guilds.cache.map(guild => {
        try {
            let channel = guild.channels.cache.find(channel => channel.name === 'general') || guild.channels.cache.first();
            if (channel) {
                channel.send(message);
                
            } else {
                console.log('The server ' + guild.name + ' has no channels.');
            }
        } catch (err) {
           console.log('Could not send message to ' + guild.name + '.');
           console.log(err)
        }
    });
    message.react("✅");
    message.reply("Your announcement has been sent to all servers!");
}

module.exports=SendAnnouncement;
