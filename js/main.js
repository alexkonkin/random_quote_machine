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

function tweetQuote() {
    event.preventDefault();
    window.open("https://twitter.com/intent/tweet?hashtags=quotes&text=" + $('#quote').text() +"%0A"+"%E2%80%94 "+$("#author").text() ,
                "twitterwindow",
                "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");
}

function tumblrQuote(){
    event.preventDefault();
    window.open("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=" + $("#author").text() +"&content="+ $('#quote').text() +"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button" ,
        "tumblrwindow",
        "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");

}

window.onload = getNewQuote();

