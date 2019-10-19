const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const { mongoURI, cookieKey } = require("./config/keys");
require("./services/passport");
const authRouter = require("./routes/auth");

const app = express();

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(
  cookieSession({
    maxAge: 2592000000,
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
