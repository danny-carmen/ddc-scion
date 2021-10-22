const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const session = require("express-session");
// let passport = require("passport");
// const MongoStore = require("connect-mongo");
const path = require("path");

// const MongoStore = require("connect-mongo")(session);

require("dotenv").config();
// require("./config/passportConfig");

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.URL;

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established.");
});

app.use(express.static(path.join(__dirname, "/../build")));

// app.use(cors({ origin: "*", credentials: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const sessionStore = new MongoStore({
//   mongoUrl: process.env.ATLAS_URI,
// });

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
