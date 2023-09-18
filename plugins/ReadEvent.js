const FilePath = "./datas/onGoingEvent.json";
const fs = require('fs');
const { EmbedBuilder, time } = require('discord.js');
const Event_JSONKey_Array = ["event1","event2","event3","event4","event5","event6","event7","event8","event9","event10"];
const MouthStrConvert_Array = ["","Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];

function CheckTime(DateStr) {
    try {
        let OsTime = new Date();
        let Year = parseInt(DateStr.substring(0,4));
        let Month = parseInt(DateStr.substring(4,6));
        let Day = parseInt(DateStr.substring(6,8));
        let Hour = parseInt(DateStr.substring(8,10));
       // let Minute = parseInt(DateStr.substring(10,12));
        if (OsTime.getFullYear() < Year) {
            return true;
        } else if (OsTime.getFullYear() == Year) {
if (OsTime.getMonth() < Month) {
                return true;
            } else if (OsTime.getMonth()+1 == Month) {
                 if (OsTime.getDate() < Day) {
                    return true;
                } else if (OsTime.getDate() == Day) {
                    if (OsTime.getHours() < Hour) {
                        return true;
                    } else if (OsTime.getHours() == Hour) {
                        return true;
                }
                }
            }
        }
       
        return false;
    } catch(err) {
        console.log(err)
        return false;
    }
}

function GetEventDate(DateStr) {
    try{
    var IptMonth = parseInt(DateStr.substring(4,6));
    var IptDay = parseInt(DateStr.substring(6,8));
    var IptHour = parseInt(DateStr.substring(8,10));
    var IptMinute = parseInt(DateStr.substring(10,12));

    if (IptDay == 0 || IptDay > 31) {
        IptDay = "";
    };
    if (IptHour < 0 || IptHour > 24) {
        IptHour = "";
    };
    if (IptMinute < 0 || IptMinute >= 60) {
        IptMinute = "";
    };
    
    var finalStr = MouthStrConvert_Array[IptMonth]+" "+(IptDay.toString())+" "+(IptHour.toString())+":"+(IptMinute.toString());
    return finalStr;
} catch(err) {
    console.log(err);
    return "Error";
}
};

function CreateEmbed(color,title,desc,dateStr) {

    var InfoEmbed = new EmbedBuilder()
             	.setColor(color)
	            .setTitle(title)
             	.setURL('https://www.rhhsmusic.ca/')
            	.setAuthor({ name: 'RHHS Music', iconURL: 'https://yt3.googleusercontent.com/ytc/AOPolaSllNu7BTkGRmhNTkJvLb5i_wbFghZYLfGzHjFhEw=s176-c-k-c0x00ffffff-no-rj', url: 'https://www.rhhsmusic.ca/' })
	            .setDescription(" ")
            	.setThumbnail('https://free-icon-rainbow.com/i/icon_10722/icon_10722_svg_s2.svg')
            	.addFields(
	            	{ name: 'Description', value: desc },
		            { name: '\u200B', value: '\u200B' },
	             	{ name: '\nDate: ', value: GetEventDate(dateStr), inline: true },
	            )
             //	.setImage('https://www.pngkit.com/png/full/1-16800_music-notes-png-clipart.png')
	            .setTimestamp()
	            .setFooter({ text: 'RHHS Music Council 2023-2024', iconURL: 'https://cdn.discordapp.com/icons/951535930320244778/56706ed914edbb753a38ca8d6dcf2234.webp?size=128' });
    return InfoEmbed;
}

function ReplyEvents(message) {
    fs.readFile(FilePath, 'utf8', function readFileCallback(err, data){
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(data);
                for (let i = 0; i < 10; i++) {
                    if (obj[Event_JSONKey_Array[i]]["IsActive"]) {
                        if (CheckTime(obj[Event_JSONKey_Array[i]].Date)) {
                            message.channel.send({embeds: [CreateEmbed(0x394539,obj[Event_JSONKey_Array[i]].Title,obj[Event_JSONKey_Array[i]].Discription,obj[Event_JSONKey_Array[i]].Date)]});
                        } else {
                            message.channel.send("[Expired] "+obj[Event_JSONKey_Array[i]].Title);
                        }
                    }
                }
        }
    });
}

module.exports = ReplyEvents;