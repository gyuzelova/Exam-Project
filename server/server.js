const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { SECRET } = require('./config');

const port = 3000;
const nameDb = 'fish-world';
const {auth} = require("./middlewares/authMiddleware"); 

const routes = require('./routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(SECRET));
app.use(auth); 


app.use(routes);

mongoose.connect(`mongodb://localhost:27017/${nameDb}`)
.then(()=>{
    console.log(' DB Connected...');
    app.listen(port, ()=>{console.log(`Server listen on port ${port}...`);});
})
.catch(err => console.log('Connot connect to DB!', err));
