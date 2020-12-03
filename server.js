const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log('request made');
     //console.log(req.url, req.method);
     // /about GET

    //set header content type
    res.setHeader('Content-Type', 'text/html');


    // lodash
        const num = _.random(0, 20);
        console.log(num);

        const greet = _.once(() => {
            console.log('hello');
        });
        greet();
        greet(); // this will be ignore

    // res.write('<p>hello, ninjas</p>');
  // res.write('<p>hello again, ninjas</p>');
  // res.end();

  // send html file
  // fs.readFile('./views/index.html', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.end();
  //   }
  //   //res.write(data);
  //   res.end(data);
  // });
    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break
        case 'about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default :
            path += '404.html';
            res.statusCode = 404;
    }

    // send html
    fs.readFile(path, (err,data) => {
        if (err) {
            console.log(err);
            res.end();
        } 
        // res.write(data);
        res.end(data);
    })

});



server.listen(3000, 'localhost', () => {
    console.log('Listening for request on port 3000')
});


