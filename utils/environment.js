require('dotenv').config();

/* eslint no-process-env:0 */
module.exports.default = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  // Grab everything in your .env file here
};
