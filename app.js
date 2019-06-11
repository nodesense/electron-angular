const express = require('express');
var bodyParser = require('body-parser')
const {nodeHid} = require('./hid');

const app = express();
var jsonParser = bodyParser.json()
app.use(jsonParser)


app.get("/", (req, res) => {
    res.send('welcome')
  });
  
  app.get("/devices", async (req, res) => {
    const devices = await nodeHid.getDevices();
    res.json(devices)
  });
  
module.exports = {app};  