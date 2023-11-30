import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "wat";
const yourPassword = "wat1";
const yourAPIKey = "8016fbdc-c0ee-4f95-ac25-279eb01f7b0f";
const yourBearerToken = "59466a7d-577a-4594-bb23-35aa01e75e07";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const tmp = await axios.get(API_URL+"random")
    console.log(tmp.data);
    res.render("index.ejs", {content : JSON.stringify(tmp.data)})
  } catch (error){
    console.log(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
    const tmp = await axios.get(API_URL+"all?page=2", {
      auth :{
        username: yourUsername,
        password: yourPassword
      }
    })
    console.log(tmp.data);
    res.render("index.ejs", {content: JSON.stringify(tmp.data)})
  } catch (e){
    console.log(e.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try{
    const tmp = await axios.get(API_URL + "filter", {params : {
      score: 5,
      apiKey: yourAPIKey
    }})
    res.render("index.ejs", {content: JSON.stringify(tmp.data)})
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try{
    const tmp = await axios.get(API_URL + "secrets/2", {headers : {
      Authorization : `Bearer ${yourBearerToken}`
    }})
    res.render("index.ejs", {content : JSON.stringify(tmp.data)})
  }catch (e){
    console.log(e.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
