//https://www.boredapi.com/
const requestUrl = "https://www.boredapi.com/api/activity?";

function BeBored(message) {
    fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
       let activity = data.activity;
       let person = data.participants;
       let price = data.price;
       var Result = 'Feeling bored? You might want to:\n"'+activity+'", it only requires '+person.toString()+" participants.\ncost: $"+price.toString();
        message.reply(Result);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
    module.exports=BeBored;
