const Twitter = require('twitter');
const rp = require('request-promise');


var client = new Twitter({
    consumer_key: 'KrlXVqNmu3geyE15neKFKizS4',
    consumer_secret: 't2Ylj5vfk0AzmgJDNOHDjCEpisGfHL1LM39E93x9Og6ocDNYCv',
    access_token_key: '1016511750773116928-RDVhyVdzNjDdnfhZLzT7BIkR6mj8E1',
    access_token_secret: 'Y7OZ3CkFiCczJ5SfrdfeONDDpaa8069jaKSQmWA6NhXHZ',
  });
   
  function get (name){
  var params = {screen_name: name};
  return client.get('statuses/user_timeline', params).then(function(tweets) {
     return(tweets[0].text);
    })
  }
     
module.exports={
    get
}
