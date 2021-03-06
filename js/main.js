/**
 * Created by oleksiy.konkin on 5/11/2018.
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
     });
}

function tweetQuote() {
    window.open("https://twitter.com/intent/tweet?hashtags=quotes&text=" + $('#quote').text() +"%0A"+"%E2%80%94 "+$("#author").text() ,
    '_blank');
}

function tumblrQuote(){
    window.open("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=" + $("#author").text() +"&content="+ $('#quote').text() +"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button" ,
    '_blank');

}

window.onload = getNewQuote();

