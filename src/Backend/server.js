const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');

const express = require("express");
const mongoose = require('mongoose');
const Expense = require('./models/ExpenseModel.js')
const ExpenserRoute = require('./routes/ExpenseRoute.js')
const authRoutes = require('./routes/AuthRoutes.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
}));


app.get('/',(req,res)=>{
    res.send("Hello from Node APi");
})
app.use('/api/Expense',ExpenserRoute);

app.use('/', authRoutes);

app.listen(3000,()=>
{
    console.log("Server is running on the port 3000");
})

mongoose.connect(process.env.MONGODB_URI)
   .then(() =>{
       console.log("Connected to database");
   })
   .catch((err)=>{
    console.log("Connection failed",err.message);
   })