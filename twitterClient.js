var Twitter = require('twitter');
const rp = require('request-promise');
var Twit = require('twit')

//var client = new Twitter({
  var T = new Twit({  
  consumer_key: 'KrlXVqNmu3geyE15neKFKizS4',
  consumer_secret: 't2Ylj5vfk0AzmgJDNOHDjCEpisGfHL1LM39E93x9Og6ocDNYCv',
  //access_token_key: '1016511750773116928-RDVhyVdzNjDdnfhZLzT7BIkR6mj8E1',
  //access_token_secret: 'Y7OZ3CkFiCczJ5SfrdfeONDDpaa8069jaKSQmWA6NhXHZ'
  app_only_auth:        true
});

function get(name){
    let lista= []
    let params= {
        q: name,
        count: 3
    }
    T.get('search/tweets', params,  function (err, data, response) {
        let twits= data.statuses;
        for (i=0; i<twits.length; i++){
            lista.push(twits[i].text)
        }
    })
    console.log('/////////////////////')
    console.log( lista  )
}
module.exports={
    get
}

