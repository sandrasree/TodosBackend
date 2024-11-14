const express = require('express');
const app = express();
const bodyParser=require('body-parser')
require('dotenv').config()
const cors=require('cors')
const mongoose=require('mongoose')
const todosRoute=require('./routes/todos')
const PORT = 3000;
const mongoUri=process.env.MONGODB_URI;

mongoose.connect(mongoUri)
                .then(()=>console.log('connection established successfully'))
                .catch((err)=>console.log('Error in establishing connection',err))

app.use(bodyParser.json());
app.use(cors());     
app.use('/api/todos',todosRoute);      
app.use(express.json());
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});