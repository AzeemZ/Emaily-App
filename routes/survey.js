const express = require("express");
const Path = require("path-parser").default;
const { URL } = require("url");
const _ = require("lodash");

const Survey = require("../models/survey");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const surveyCampaign = require("../services/surveyCampaign");

const router = express.Router();

router.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  try {
    await surveyCampaign(subject, body, recipients, survey.id);
    await survey.save();
    req.user.credits -= 1;
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(422).send(error);
  }
});

router.get("/api/surveys", requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: 0
  });

  res.send(surveys);
});

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for voting!");
});

router.post("/api/surveys/webhooks", (req, res) => {
  const path = new Path("/api/surveys/:surveyId/:choice");

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = path.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ email, surveyId, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date()
        }
      ).exec();
    })
    .value();

  res.sendStatus(200);
});

module.exports = router;
