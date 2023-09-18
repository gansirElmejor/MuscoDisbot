//https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
const requestUrl = 'https://api.thecatapi.com/v1/images/search?limit=1';

function RandCat(channel) {
    fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    channel.send({files: [data[0].url]})
    .then(console.log)
    .catch(console.error);
  })
  .catch((error) => {
    console.error(error);
  });
}


module.exports = RandCat;