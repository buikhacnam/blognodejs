const express = require("express");
const router = express.Router();
const Blog = require('../models/blog');


router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    }).catch(err => console.log(err));
})

router.post('/', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/');
    }).catch(err => console.log(err));
})
  
router.get('/read/:id', (req, res) => {
  const id = req.params.id;
  //console.log(id);
  Blog.findById(id)
    .then(result => {
      res.render('details', {blog: result, title: "Details"});
    })
    .catch(err => console.log(err));
});
router.get('/about', (req, res, next) => {
    res.render('about', { title: 'About' });
    //console.log("about")  
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'new blog' });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json( { redirect: '/blogs'})
    })
    .catch(err => console.log(err));
})
  


module.exports = router;