let apikey= 'AIzaSyCjsHe49ctuLRcjOzz7T_3rWtPfG5NyzrE'

let URL=  'https://www.googleapis.com/youtube/v3/search'

let url_wathc_videos= 'https://www.youtube.com/watch?v='

const rp = require('request-promise');

function getVideosForArtist(artistName){
    const options = 
    {
        url: URL,
        qs:
            {
                part: 'snippet',
                maxResults: 3,
                q:artistName,
                key: apikey
            },
            json: true
    }
    return rp.get(options).then( (response) =>
    {   
        let videos= response['items']
        let urls_Videos= []
        videos.forEach((item) => {
            urls_Videos.push(url_wathc_videos+item.id.videoId)
        });
        return urls_Videos;
    })
}

module.exports= {
    getVideosForArtist
}