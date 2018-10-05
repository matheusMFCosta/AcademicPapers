const express = require('express');
var proxy = require("http-proxy-middleware")
var url = require("url");
const app = express();
const portNumber = 3000;
const sourceDir = 'dist';



app.use('/pd/search', proxy('https://search-api.passeidireto.com/api/Search/GlobalSearch'));
app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
