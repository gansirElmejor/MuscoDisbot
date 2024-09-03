//https://musicbrainz.org/doc/MusicBrainz_API
function SearchArtist(message,artistName) {
let requestUrl = `https://musicbrainz.org/ws/2/artist?query=${artistName}&fmt=json`;

fetch(requestUrl, {
 /* headers: {
    'User-Agent': 'My Music App',
    'Authorization': 'Bearer YOUR_API_KEY',
  }, */
})
  .then((response) => response.json())
  .then((data) => {
    var Result;
    if (data.artists.length >= 3) {
        Result = `Top 3 search results:\n${data.artists[0].name}\n${data.artists[1].name}\n${data.artists[2].name}`;
    } else {
        if (data.artists.length != 0) {
            Result = `Search results:\n${data.artists[0].name}`;
            if (typeof data.artists[1] != 'undefined') {
                Result = Result+"\n"+data.artists[1].name;
            };
            if (typeof data.artists[2] != 'undefined') {
                Result = Result+"\n"+data.artists[2].name;
            };
        } else {
            Result = "No results!";
        }
    }
    

    message.channel.send(Result);
  })
  .catch((error) => {
    console.error(error);
  });
}

module.exports=SearchArtist;