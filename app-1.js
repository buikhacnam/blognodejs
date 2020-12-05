const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoute');
//express app
const app = express();

// connect to MongoDB
const dbURI = "mongodb+srv://mrbui:mrbui123456@cluster0.jntsz.mongodb.net/note-tuts?retryWrites=true&w=majority";

mongoose.connect( dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


// register view engine: by default in views folder
app.set('view engine', 'ejs');
//find this in the myviews folder: app.set('views', 'myviews');

//middleware and static files:
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//homepage
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//about
app.get('/about', (req, res) => {
    res.render('about',{ title: 'About' });
})

//other routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});



