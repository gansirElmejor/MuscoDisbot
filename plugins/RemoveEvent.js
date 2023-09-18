const fs = require('fs');
const { type } = require('os');
const Event_JSONKey_Array = ["event1","event2","event3","event4","event5","event6","event7","event8","event9","event10"];



function FindTargetPost(TargetPostStr,msg,RpMsg) {
    
    try {
        fs.readFile('./datas/onGoingEvent.json', 'utf8', function readFileCallback(err, data){
            if (err) {
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                var TargPost;
                for (let i = 0; i < 10; i++) {
                   if (obj[Event_JSONKey_Array[i]]["Title"] == TargetPostStr) {
                       TargPost = Event_JSONKey_Array[i];
                    };
                };
                var OBJ = obj;
                if (typeof TargPost !== "undefined") {
                    OBJ[TargPost]["IsActive"] = false;
                    if (writeFile(OBJ)) {
                        RpMsg.edit('Successfully Removed!').then(msg => console.log(`Updated the content of a message to ${msg.content}`)).catch(console.error);
                        msg.react("✅");
                    } else {
                        RpMsg.edit('An error has occured! Please contact DEV!').then(msg => console.log(`Updated the content of a message to ${msg.content}`)).catch(console.error);
                        msg.react("⚠️");
                    };
                } else {
                    RpMsg.edit("⚠️Invalid Input⚠️\n(Make sure to enter the full event title which to remove)").then(msg => console.log(`Updated the content of a message to ${msg.content}`)).catch(console.error);
                    msg.react("❌");
                }
            };

        });
   } catch(Err) {
       console.log(Err);
       RpMsg.edit('An error has occured! Please contact DEV!').then(msg => console.log(`Updated the content of a message to ${msg.content}`)).catch(console.error);
       msg.react("⚠️");
   };
};

function writeFile(OBJ) {
    try{
        var json = JSON.stringify(OBJ);
        fs.writeFile('./datas/onGoingEvent.json', json, 'utf8', (err) => err && console.error(err));
        return true;
    } catch(Err) {
        console.log(Err);
        return false;
    };
    
};

async function RemoveEvent(TargetPostStr,msg) {
    let channel = msg.channel;
    var RpMsg = await channel.send("Removing...");
    FindTargetPost(TargetPostStr,msg,RpMsg);
};

module.exports = RemoveEvent;