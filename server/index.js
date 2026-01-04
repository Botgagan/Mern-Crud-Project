import express from "express";
import connectDB from "./database.js";
import bookRouter from "./routes/book.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


//database connection
 await connectDB();

const app = express();

app.use(cors());

app.use(express.json());//middleware

app.get('/',(req,res) => {
    res.send("Hello World");
});

app.use('/book', bookRouter);// this is the base url like http://localhost:8000/book/addbook
app.use('/user', userRouter);

app.listen(8000, () => {
    console.log("Port Listening on 8000");
});