/**
 * Created by oleksiy.konkin on 5/11/2018.
 */
/*
 https://freshman.tech/random-quote-machine/
 https://market.mashape.com/andruxnet/random-famous-quotes#get-endpoint
 https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous

 curl --get --include 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10' \
 -H 'X-Mashape-Key: pd9oOREpx3msh2g7wpKqSIXyf4MWp1WcU8BjsnWT72D2uj83at' \
 -H 'Accept: application/json'

 */

function QuoteRequester(aKey, aTopic){
    this.key = aKey;
    this.topic = aTopic;
}

QuoteRequester.prototype.getTopic = function(){
    return this.topic;
}

QuoteRequester.prototype.getTopic = function(aTopic){
    this.topic = aTopic;
}


