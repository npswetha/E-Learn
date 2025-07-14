const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());
const courseRoutes = require("./routes/fetchcourse");
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const enrollRoute = require('./routes/enroll');
const courseDetailRoute = require("./routes/courseDetail");

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.error(err));

app.get('/',(req,res)=>{
    res.send('Backend is running');
});

app.use("/api/courses", courseRoutes);
app.use('/api/auth/signup', signupRoute);
app.use('/api/auth/login', loginRoute);
app.use('/api/enroll', enrollRoute);
app.use('/api/courses', courseDetailRoute); 
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server is running on port',port);
});
