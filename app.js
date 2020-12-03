const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//express app
const app = express();

// connect to MongoDB
const dbURI = "mongodb+srv://mrbui:mrbui123456@cluster0.jntsz.mongodb.net/note-tuts?retryWrites=true&w=majority";

mongoose.connect( dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// listen for requests
//app.listen(3000);

// register view engine: by default in views folder
app.set('view engine', 'ejs');
//find this in the myviews folder: app.set('views', 'myviews');

//middleware play around:
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log("host:", req.hostname);
//     console.log("path:", req.path);
//     console.log('method:', req.method);
//     next();
// })

//app.use(morgan("dev"));

//middleware and static files:
app.use(express.static('public'));

//mongoose & mongo test
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });
  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
})

app.get("/all-blog", (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
})

app.get('/single-blog', (req, res) => {
  Blog.findById('5fc9765082883f0e00a13189')
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err));
})


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    }).catch(err => console.log(err));
})
  
app.get('/about', (req, res, next) => {
    res.render('about', { title: 'About' });
    //console.log("about")  
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});
  
// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
