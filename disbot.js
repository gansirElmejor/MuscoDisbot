require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require('fs');
const Event_JSONKey_Array = ["event1","event2","event3","event4","event5","event6","event7","event8","event9","event10"];
const CommandPerfix = "!";
const AdministratorId = ["754519395975561286"];
//const { Configuration, OpenAIApi } = require("openai");

//const FreeChatChennelId = "951537831581483058";
// ChatPlugins Below
const ReplyBotInfo = require("./plugins/info.js");
const RemoveEvent = require("./plugins/RemoveEvent.js");
const ReplyEvent = require("./plugins/ReadEvent.js");
const RandCat = require("./plugins/RandCat.js");
const RandDog = require("./plugins/RandDog.js");
const SearchArtist = require("./plugins/SearchArtist.js");
// ChatPlugins Above

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]
});
/*
const configuration = new Configuration({
    organization:process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);
*/

// PostEvents;
var PostEventUserStatus = {}

function PostEvent_CheckCurrentStep(User_Inst) {
    if (User_Inst in PostEventUserStatus) {
        console.log("User in process of postevent");
        return true;
    } else {
        return false;
    }
};

function PostEvent_Proceed(User_Inst,msgStr,channel) {

    function CheckDateFormate(dateStr) {
    try{
        var IptYear = parseInt(dateStr.substring(0,4));
        var IptMonth = parseInt(dateStr.substring(4,6));
        var IptDay = parseInt(dateStr.substring(6,8));
        var IptHour = parseInt(dateStr.substring(8,10));
        var IptMinute = parseInt(dateStr.substring(10,12));
        
        if (isNaN(IptYear) || isNaN(IptMonth) || isNaN(IptDay) || isNaN(IptHour) || isNaN(IptMinute)) {
            channel.send('⚠️Invalid Input⚠️\nPlease enter event date follow the format YYYYMMDDHHMM:\n(Enter "CANCEL" to cancel your action)')
            return false;
        } else {
            return true;
        };
    } catch(Err) {
        console.log(Err);
        channel.send('⚠️Invalid Input⚠️\nPlease enter event date follow the format YYYYMMDDHHMM:\n(Enter "CANCEL" to cancel your action)')
            return false;
    };
    };

    function GetMinFreePost(jsonObj) {
        var MinNum = Infinity;
        for (let i = 0; i < 10; i++) {
            if (jsonObj[Event_JSONKey_Array[i]]["IsActive"] == false && MinNum > i) {
                MinNum = i;
            };
        };
        
        return MinNum;
    };

    function WriteToFile(AllInputs) {
        try {
             fs.readFile('./datas/onGoingEvent.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
                return false;
            } else {
                var obj = JSON.parse(data); //now it an object;
                obj[Event_JSONKey_Array[GetMinFreePost(obj)]]["Title"] = AllInputs[1];
                obj[Event_JSONKey_Array[GetMinFreePost(obj)]]["Discription"] = AllInputs[2];
                obj[Event_JSONKey_Array[GetMinFreePost(obj)]]["Date"] = AllInputs[3];
                obj[Event_JSONKey_Array[GetMinFreePost(obj)]]["IsActive"] = true;
                var json = JSON.stringify(obj);
                fs.writeFile('./datas/onGoingEvent.json', json, 'utf8', (err) => err && console.error(err));
                return true;
        }});
          return true;
        } catch(Err) {
            console.log(Err);
            return false;
        }
     
    };

    if (msgStr == "CANCEL") {
        delete PostEventUserStatus[User_Inst];
        channel.send('The action has been cancelled');
        return true;
    };
    if (PostEventUserStatus[User_Inst][0] == "title") {
        PostEventUserStatus[User_Inst][1] = msgStr; // [1] is title, [2] is discription, [3] is date;
        PostEventUserStatus[User_Inst][0] = "disc";
        channel.send('Please enter event discription:\n(Enter "CANCEL" to cancel your action)');
        return true;
    } else 
    if (PostEventUserStatus[User_Inst][0] == "disc") {
        PostEventUserStatus[User_Inst][2] = msgStr; // [1] is title, [2] is discription, [3] is date;
        PostEventUserStatus[User_Inst][0] = "date";
        channel.send('Please enter event date follow the format YYYYMMDDHHMM:\n(Enter "CANCEL" to cancel your action)');
        return true;
    } else 
    if (PostEventUserStatus[User_Inst][0] == "date") {
        if (CheckDateFormate(msgStr)) {
            PostEventUserStatus[User_Inst][3] = msgStr; // [1] is title, [2] is discription, [3] is date;
            PostEventUserStatus[User_Inst][0] = "final";
            channel.send('Please enter "CONFIRM" to confirm posting:\n(Enter "CANCEL" to cancel your action)');
            return true;
        } else {
            return false;
        };
        
    } else
    if (PostEventUserStatus[User_Inst][0] == "final") {
        if (WriteToFile(PostEventUserStatus[User_Inst])) {
            channel.send('Event has been posted!');
            delete PostEventUserStatus[User_Inst];
            return true;
        } else {
            delete PostEventUserStatus[User_Inst];
            channel.send('An error has occured!\nThe action has been cancelled');
            return false;
        };
    };
};

//Recieve Messages
client.on("messageCreate", async function(message){
    try{
        const SplitedContent = message.content.split(" ");
        let Perfix = SplitedContent[0].toLowerCase(); // All perfix should be lowercase;
        let channel = message.channel;
        let User_Inst = message.author;
        
        //Run checks before proceed below
        if (message.author.bot) return;
        if (PostEvent_CheckCurrentStep(User_Inst)) {if (PostEvent_Proceed(User_Inst,message.content,channel)) {message.react("✅");} else {message.react("❌");}; return;};
        //Checks above

        if (Perfix == CommandPerfix+"info") {
            ReplyBotInfo(message);
            return;
        } else
        if (Perfix == CommandPerfix+"test") {
            message.reply("OK test is good.");
            return;
        } else
        if (Perfix == CommandPerfix+"postevent") {
            if (!(AdministratorId.includes(User_Inst.id))) {
                message.react("❌");
                message.reply("Sorry, you are not authenticated to run this command!")
                return;
            };
            channel.send('Please enter event title:\n(Enter "CANCEL" to cancel your action)')
            .then(msg => console.log(`Sent message: ${msg.content}`))
            .catch(console.error);
            PostEventUserStatus[User_Inst] = [];
            PostEventUserStatus[User_Inst][0] = "title";
            return;
        } else
        if (Perfix == CommandPerfix+"removeevent") {
            if (!(AdministratorId.includes(User_Inst.id))) {
                message.react("❌");
                message.reply("Sorry, you are not authenticated to run this command!")
                return;
            };
            try{
            let Arg1 = message.content.substring(13,message.content.length);
            RemoveEvent(Arg1,message);
            return;
            } catch(Err) {
                console.log(Err);
                msg.reply('An error has occured! Please contact DEV!').then(msg => console.log(`Updated the content of a message to ${msg.content}`)).catch(console.error);
                msg.react("⚠️");
            };
        } else
        if (Perfix == CommandPerfix + "event" || Perfix == CommandPerfix + "events") {
            ReplyEvent(message);
            return;
        };
        if (Perfix == CommandPerfix + "randomcat") {
            RandCat(channel);
            return;
        };
        if (Perfix == CommandPerfix + "randomdog") {
            RandDog(channel);
            return;
        };
        if (Perfix == CommandPerfix+"searchartist") {
             if (typeof SplitedContent[1] == 'undefined') {
                message.react("❌")
                message.reply("Missing artist name!")
                return;
            };
            let Arg1 = message.content.substring(14,message.content.length);
            SearchArtist(message,Arg1);
            return
        }
       // if (message.channel.id != FreeChatChennelId) return;
        
        /*
        const AiResponse = await openai.createCompletion({
            model: "davinci",
            prompt: `Mr Rawlins is a professional english music expert. Mr Rawlins is very serious about music.\n\
            Mr Rawlins: "Hello, how are you doing?"\n\
            ${message.author.username}: ${message.content}
            Mr Rawlins: "`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ["Mr Rawlins:", `${message.author.username}:`],
        })
        var ReplyText = `${AiResponse.data.choices[0].text}_`;
        message.reply(ReplyText);
        return;*/
    }catch(Err){
        console.log(Err)
    }
});

client.login(process.env.DISCORD_TOKEN);