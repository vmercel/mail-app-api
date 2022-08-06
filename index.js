// In src/index.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

const v1MessageRouter = require("./v1/routes/messageRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });

let corsOptions = {
  origin: 'http://localhost:5000',
}

app.use(bodyParser.json());
app.use("/api/v1/messages", v1MessageRouter);
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});

module.exports = app;
