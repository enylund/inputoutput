// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var tumblr = require('tumblr');
var url = require('url');
var ejs = require('ejs');

var view = fs.readFileSync(__dirname + '/view.ejs', 'utf8');


var oauth = {
  consumer_key: 'SUNpLgKqnJjL8biuJCEA0Iktk7oudjtinZIW4n7d7ueJi9N8ZG',
  consumer_secret: 'ExLHAr9JtVhaBqXhrtWcMURLMz0o6L00S6gk6OYrPvfDvwF7E6',
  token: 'SUNpLgKqnJjL8biuJCEA0Iktk7oudjtinZIW4n7d7ueJi9N8ZG',
  token_secret: 'ExLHAr9JtVhaBqXhrtWcMURLMz0o6L00S6gk6OYrPvfDvwF7E6'
};


function searchTumblr(queryData, tagged, response) {

tagged.search( queryData, function(error, res) {
    if (error) {
          throw new Error(error);
    }

    response.write(ejs.render(view, {locals: {
    data: res,
    }}));
    response.end();

});

}


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var queryData = url.parse(request.url, true).query;
  queryData = queryData.data;
  console.log(queryData);

  response.writeHead(200, {'Content-Type': 'text/html'});

 var user = new tumblr.User(oauth);
 var tagged = new tumblr.Tagged(oauth);

if (queryData) {

searchTumblr(queryData, tagged, response);

} else {
  response.write(ejs.render(view));
  response.end();
}


}).listen(8000);

console.log("Server running at http://127.0.0.1:8000/");
