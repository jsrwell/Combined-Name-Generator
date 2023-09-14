import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __root = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 8000;
var combinedName = "";

app.use(bodyParser.urlencoded({ extended: true }));

const combinedNameGenerator = (req, res, next) => {
    console.log(req.body);
    combinedName = `${req.body["first_name"]} ${req.body["last_name"]}`
    next();
}

app.use(combinedNameGenerator);

app.get("/", (req, res) => {
    res.sendFile(__root + "/public/index.html");
})

app.post("/submit", (req, res) => {
    res.send(`<h1>The combined name is:</h1> <h2>${combinedName}</h2>`);
})

app.listen(port, () => {
    console.log(`Listen on: http://localhost:${port}`);
})