
const express = require("express");
const app = express();
const cors = require('cors');

//use
app.use(express.json());
app.use(cors());

// tables to db
const db = require('./models');

//Routers
const postsRouter = require('./routes/Posts');
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);

const usersRouter = require('./routes/Users');
app.use('/userAuth', usersRouter);

// code to sql to db
db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log('server is running on 3001 port...');
    })
})
