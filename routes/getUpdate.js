const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const client = require('@mailchimp/mailchimp_marketing');
const config = require('../utils/environment');
client.setConfig({
  apiKey: config.default.MAILCHIMP_API_KEY,
  server: config.default.MAILCHIMP_SERVER_PREFIX
});

// @route    POST api/audience
// @desc     Subcribe to updates
// @access   Public

router.post('/', [body('email', 'Invalid email').isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Make sure fields are filled
    if (!email || !email.length) {
      return res.status(400).json({ errors: 'enter an email address' });
    }
    const response = await client.lists.addListMember(config.default.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed'
    });
    return res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      errors: 'Something went wrong, please send email to teamwheatfinance@gmail.com'
    });
  }
});

module.exports = router;
