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

function QuoteRequester(anUrl, aKey, aTopic){
    this.url = anUrl;
    this.key = aKey;
    this.topic = aTopic;
    this.quote = [];

}

QuoteRequester.prototype.getTopic = function(){
    return this.topic;
}

QuoteRequester.prototype.setTopic = function(aTopic){
    this.topic = aTopic;
}

QuoteRequester.prototype.requestQuote = function(){
      var self = this;

      return $.ajax({
             url: this.url,
             data: {"cat": this.topic},
             dataType: 'json',
             async: true,
             accept: {
                 json: "application/json"
             },
             headers: {
                 'X-Mashape-Key': this.key
             },
             success: function(data){
                 self.quote = data;
             }
         });

}

QuoteRequester.prototype.getQuote = function(){
    return this.quote;
}

function Quote(aQuote){
    this.quote = aQuote[0].quote;
    this.author = aQuote[0].author;
    this.category = aQuote[0].category;
}

Quote.prototype.getQuote = function(){
    return this.quote;
}

Quote.prototype.getAuthor = function(){
    return this.author;
}

Quote.prototype.getCategory = function(){
    return this.category;
}

function getNewQuote(){
    var q = new QuoteRequester("https://andruxnet-random-famous-quotes.p.mashape.com/",
                                "pd9oOREpx3msh2g7wpKqSIXyf4MWp1WcU8BjsnWT72D2uj83at",
                                "famous");

     $.when(q.requestQuote()).done(function() {
         var reply = new Quote(q.getQuote());
         $("#quote").text(reply.quote);
         $("#author").text(reply.author);
         console.log("logging " + reply.quote);
     });
}




