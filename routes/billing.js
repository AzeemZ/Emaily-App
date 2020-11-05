const express = require("express");
const { stripeSK } = require("../config/keys");
const stripe = require("stripe")(stripeSK);
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

router.post("/api/stripe", requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 credits",
    source: req.body.id
  });

  req.user.credits += 5;
  const user = await req.user.save();

  res.send(user);
});

module.exports = router;
