import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";




dotenv.config();
const app =express();
const PORT = process.env.PORT || 8000;


app.use(cors({
    origin: "*"
}));

app.use(express.json({
        limit: "10mb",
    }));
app.use(express.urlencoded({
    extended:true,
}));

app.use("/api-v1", routes);
app.use((req, res)=>{
    res.status(404).json({
        status: "404: NOT FOUND",
        message: "Route not found"
    });});

app.listen(PORT, ()=>{

    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
});




