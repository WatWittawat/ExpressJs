import express from "express"
import axios from "axios"

const app = express();

const port = 3000;

app.use(express.static("public"))

app.get("/",  async (req, res) => {
    const tmp = await axios.get("https://secrets-api.appbrewery.com/random")
    console.log(tmp.data);
    res.render("index.ejs", {secret : tmp.data.secret, user : tmp.data.username})
})

app.listen(port, () => {
    console.log(`Listen on Port ${port}`);
})
