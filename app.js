const express=require('express');

const app=express();
//mongodb connection

const mongoose=require('mongoose');

const blogRoutes=require('./routes/blogRoutes')
const dbURI='mongodb+srv://netninja:test1234@nodetuts.l05bq.mongodb.net/node-tuts?retryWrites=true&w=majority';


mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
        .then((result)=>app.listen(3000))
        .catch((err) => console.log(err));
          


const morgan=require('morgan');
const { result } = require('lodash');
const { render } = require('ejs');
app.set('view engine','ejs');





//middle ware for static files : making css and images public

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));



app.use(morgan('dev'));



app.get('/',(req,res) => {
  res.redirect('/blogs');
});
app.get('/about',(req,res) => {
  
    res.render('about')

});


app.use(blogRoutes);


// firing middleware 
app.use((req,res) => {
    res.status(404).render('404');
});