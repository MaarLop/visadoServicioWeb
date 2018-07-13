const Twit = require('promised-twit');
const rp = require('request-promise');

const client = new Twit({ 
  consumer_key: 'KrlXVqNmu3geyE15neKFKizS4',
  consumer_secret: 't2Ylj5vfk0AzmgJDNOHDjCEpisGfHL1LM39E93x9Og6ocDNYCv',
  access_token_key: '1016511750773116928-RDVhyVdzNjDdnfhZLzT7BIkR6mj8E1',
  access_token_secret: 'Y7OZ3CkFiCczJ5SfrdfeONDDpaa8069jaKSQmWA6NhXHZ',
  app_only_auth:        true

});

function get(name){
    let lista= []
    let params= {
        q: name,
        count: 1
    }

   return  client.getSearchTweets(params).then(function(data) {
    return data.statuses[0]
    })

        
}
module.exports={
    get
}

