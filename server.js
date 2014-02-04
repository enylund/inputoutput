// Load the http module to create an http server.
var http = require('http');
var tumblr = require('tumblr');

var oauth = {
  consumer_key: 'SUNpLgKqnJjL8biuJCEA0Iktk7oudjtinZIW4n7d7ueJi9N8ZG',
  consumer_secret: 'ExLHAr9JtVhaBqXhrtWcMURLMz0o6L00S6gk6OYrPvfDvwF7E6',
  token: 'SUNpLgKqnJjL8biuJCEA0Iktk7oudjtinZIW4n7d7ueJi9N8ZG',
  token_secret: 'ExLHAr9JtVhaBqXhrtWcMURLMz0o6L00S6gk6OYrPvfDvwF7E6'
};


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  var params = request.url;

  //Stream our response to back to the browser, starting with the headers
  response.writeHead(200, {'Content-Type': 'text/html'});
  //
  // Now begin streaming the payload, which is an HTML document
  response.write("<html>");
  response.write("<body>");

 var user = new tumblr.User(oauth);
 var tagged = new tumblr.Tagged(oauth);

tagged.search('gif', function(error, res) {
    if (error) {
          throw new Error(error);
    }

  console.log(res.length);

  for (var i = 0; i < res.length; i++) {


        var theImageUrl = res[i].photos[0].original_size.url;
        console.log(theImageUrl);
        response.write("<img src='"+ theImageUrl +"'>");

        }
  response.write("</body");
  response.write("</html>");
  response.end();

});

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

console.log("Server running at http://127.0.0.1:8000/");
