import express from "express"
import bookRouter from "./routers/book.js"

const app = express() 

const PORT = process.env.PORT || 5000;
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/book",bookRouter )

app.use((req, res) => {
    res.status(404).send("Wrong URL :(");
})

app.listen(3000,()=>{   // typical setup for starting the Express server 
    console.log(`The app is listening oi port ${PORT}`)
})