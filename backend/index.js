// dependency
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

//enviroment variables
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://circleuser:teamcircle@cluster0.o7o8p.mongodb.net/?retryWrites=true&w=majority';

//message 
console.log('Backend Service !');

//import Routes
const authRoutes  = require('./route/userRoutes');
const projectsRoutes = require('./route/projectRoutes');
const listRoutes = require('./route/listRoutes');
const cardRoutes = require('./route/cardRoutes');
const bodyParser = require('body-parser');
//body Parser
app.use(bodyParser.urlencoded({ extended: false }))

//json parser
app.use(express.json());

//Logger For Testing
const testFun = require('./middleware/auth');
app.use(testFun);

//route MiddleWares
app.use('/api/users',authRoutes)
app.use('/api/project', projectsRoutes)
app.use('/api/list', listRoutes);
app.use('/api/cards', cardRoutes);

//connection with mongoDb
mongoose.connect(mongoURI,{ useNewUrlParser: true , useUnifiedTopology: true },() =>{
  console.log('Connected to mongoDB !');
});

//listen on required port 
app.listen(PORT);
