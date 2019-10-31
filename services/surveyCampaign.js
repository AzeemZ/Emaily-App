const sgMail = require("@sendgrid/mail");
const { sendgridKey, redirectURI } = require("../config/keys");

sgMail.setApiKey(sendgridKey);

const surveyCampaign = (subject, body, recipients, surveyId) => {
  const msg = {
    to: recipients.split(",").map(email => email.trim()),
    from: "no-reply@emaily.com",
    subject,
    html: `
      <div style="text-align: center">
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${body}</p>
        <div>
          <a href="${redirectURI}/api/surveys/${surveyId}/yes">Yes</a>
        </div>
        <div>
          <a href="${redirectURI}/api/surveys/${surveyId}/no">No</a>
        </div>
      </div>
    `
  };

  sgMail.sendMultiple(msg);
};

module.exports = surveyCampaign;
