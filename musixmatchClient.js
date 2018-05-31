const basic_url= 'https://api.musixmatch.com/ws/1.1';

const api_key= 'df87d11f788a5fe4e85f6374dbb58396';

function getLyricTrack(track_name, artist_name){
    const rp = require('request-promise');
    const options = {
        url: basic_url+ 'matcher.lyrics.get?format=jsonp&callback=callback&q_track='+track_name+'&q_artist='+artist_name+'&apikey='+api_key,
        headers: { Authorization: 'Bearer ' + access_token},
        json: true,
      };
       rp.get(options).then( (response) =>{
         let parseLyric=JSON.parse(json);
        });
     let lyric= getLyricWithAnID(parseLyric['lyrics_id']);
     return lyric;
    }

function getLyricWithAnID(id_mxm){
    const rp = require('request-promise');
    const options = {
        url: basic_url+'track.lyrics.get?format=jsonp&callback=callback&track_id='+id_mxm +'&apikey='+api_key,
        headers: { Authorization: 'Bearer ' + access_token},
        json: true,
      };
       rp.get(options).then( (response) =>{
         let parseLyric=JSON.parse(json);
        });
     let lyric= getLyricWithAnID(parseLyric['lyrics_id']);
    }


module.exports={
    getLyricTrack
}