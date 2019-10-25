const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const { mongoURI, cookieKey } = require("./config/keys");
require("./services/passport");
const authRouter = require("./routes/auth");
const billingRouter = require("./routes/billing");

const app = express();

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 2592000000,
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(billingRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
