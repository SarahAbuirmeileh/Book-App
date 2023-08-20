import express from "express";
import bookRouter from "./routers/book.js";
const app = express();
const PORT = 80;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/health", function (req, res) {
    res.sendStatus(200);
});
app.use("/book", bookRouter);
app.use((req, res) => {
    res.status(404).send("Wrong URL :(");
});
app.listen(PORT, () => {
    console.log(`The app is listening oi port ${PORT}`);
});
