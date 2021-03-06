var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

url = 'https://origin-web-scraping.herokuapp.com/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var name, imageUrl, author, price;
    var json = [];
    //{ name : "", imageUrl : "", author : "", price : ""};

   

    $('.panel').each(function(i, value){
        var data = $(this);
        var box ={};
        name = data.children().first().text().replace(/^\s+|\s+$/g,'');            
        //re = data.children().last().children().text();
        imageUrl = data.children().find('img').attr('src');
        author = data.children().find('p').text();
        price = data.children().find('small').text();

        box.name = name;
       	box.imageUrl= imageUrl;
       	box.author = author;
       	box.price = price;
       	json.push(box);
    })

 
}


// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('books.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;