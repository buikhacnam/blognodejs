const express = require('express');
const app1 = express();

app1.listen(3000);
//console.log(__dirname);
//    D:\Host\blognodejs

app1.get('/', (req, res) => {
    //res.send('<p>Home page</p>');
    res.sendFile('./views1/index.html', { root: __dirname });
});

app1.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.sendFile('./views1/about.html', { root: __dirname });
});
  
// redirects
app1.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//  404 page
app1.use((req,res) => {
    res.status(404).sendFile('./views1/404.html', { root: __dirname});
})