
const api_key = 'df87d11f788a5fe4e85f6374dbb58396';

const rp = require('request-promise');

function getLyricTrack(track_name, artist_name){

        const options= 
        {
            url:'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get',
            qs:
            {
                q_track: track_name,
                q_artist: artist_name,
                apikey: api_key
            },
            json: true
        }
         return rp.get(options).then ((response)=>
        {
            let lyric= response['message'].body.lyrics.lyrics_body;
            return lyric
        })
}


module.exports={
    getLyricTrack
}