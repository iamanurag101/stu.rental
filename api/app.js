import express from "express";

const app = express(); // App is created

// Specify Port Number to listen to
app.listen(8800, ()=>{
    console.log("Server is running");
})