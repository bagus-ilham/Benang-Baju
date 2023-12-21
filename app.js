const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/router");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "abcdefg",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);
 
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
