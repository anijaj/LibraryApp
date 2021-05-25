const express = require('express');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 1800;

const preNav = 
[
    {link: "/login", name: "Login"},
    {link: "/signup", name: "Signup"},
];

const postNav =
[
    {link: "/books", name:"Books"},
    {link: "/authors", name: "Authors"},
    {link: "/addbook", name: "Update Books"},
    {link: "/addauthor", name: "Update Authors"},
    {link: "/logout", name: "Logout"}
];

const booksRouter = require('./src/routes/bookRoutes')(postNav);
const authRouter = require('./src/routes/authRoutes')(postNav);
const loginRouter = require('./src/routes/loginRoutes')(preNav);
const signRouter = require('./src/routes/signRoutes')(preNav);
const addbookRouter = require('./src/routes/addbookRoutes')(postNav);
const addauthorRouter = require('./src/routes/addauthorRoutes')(postNav);

app.use(express.static('./public'));
app.use("/books", booksRouter);
app.use("/authors", authRouter);
app.use("/login", loginRouter);
app.use("/signup", signRouter);
app.use("/addbook", addbookRouter);
app.use("/addauthor", addauthorRouter);

app.set('view engine','ejs');
app.set('views',__dirname + '/src/views');

app.get('/', (req,res)=>
{
    res.render("index",{preNav});
});

app.get('/logout', (req, res)=>
{
    req.logout();
    res.redirect('/');
})

app.listen(port,()=>{console.log("Server ready at"+port)});