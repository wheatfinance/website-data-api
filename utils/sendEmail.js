const sgMail = require('@sendgrid/mail');
const config = require('./environment');
sgMail.setApiKey(config.default.SENDGRID_API_KEY);

const sendEmail = (to, from, subject, html) => {
  const msg = {
    to,
    from, // Use the email address or domain you verified above
    subject,
    html
  };
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

module.exports = sendEmail;
