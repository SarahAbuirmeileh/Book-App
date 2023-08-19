import express from "express"
import bookRouter from "./routers/book.js"

const app = express() 
app.listen(3000,()=>{   // typical setup for starting the Express server 
    console.log("The app is listening")
})

app.use(express.json())
app.use("/book",bookRouter )

app.use((req, res) => {
    res.status(404).send("Wrong URL :(");
})