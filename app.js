const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/router");


app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
