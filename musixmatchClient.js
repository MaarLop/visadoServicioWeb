const basic_url = 'https://api.musixmatch.com/ws/1.1/';

const api_key = '&api_key=df87d11f788a5fe4e85f6374dbb58396';

const lookUpTrack = 'matcher.track.get/';//obtengo el id del track para despues hacer un 

const lookUpLyric= 'track.lyric.get'// que busca el track por id y depsues le pido el body al lyric

const rp = require('request-promise');

function getLyricTrack(track_name, artist_name){
    let promise_trackID= getTrackId(track_name,artist_name)
    promise_trackID.then((id)=>
    {
        const options= 
        {
            url: basic_url+ lookUpLyric,
            headers: { Authorization: 'Bearer ' + api_key},
            qs:
            {
                track_id: id
            },
            json: true
        }
    
        return rp.get(options).then ((response)=>
        {
            let lyric= response['body'].lyric_body;
        })

    })
}

function getTrackId(track_name,artist_name){
    options = 
    {
        url: basic_url+ lookUpTrack,
        headers: { Authorization: 'Bearer ' + api_key},
        qs:
        {
            format: json,
            callback: callback,
            q_track: track_name,
            q_artist: artist_name,
            f_has_lyrics: 0,
            f_has_subtitle: 0
        },
        json: true,
    };
    return rp.get(options).then( (response) =>
    {
         let track= response['body'].track.track_id;
         console.log (response)
    });

}



module.exports={
    getLyricTrack
}