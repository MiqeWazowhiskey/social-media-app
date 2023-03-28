
const express = require("express");
const app = express();
const cors = require('cors');

//use
app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const postsRouter = require('./routes/Posts');
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);
db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log('server is running on 3001 port...');
    })
})