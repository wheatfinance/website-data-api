const express = require('express');
const sendEmail = require('../utils/sendEmail');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// @route    POST api/contact
// @desc     Contact form api
// @access   Public
router.post(
  '/',
  [
    body('firstname', 'First Name is required').not().isEmpty(),
    body('lastname', 'Last Name is required').not().isEmpty(),
    body('company', 'Company is required').not().isEmpty(),
    body('phone', 'Phone Number is required').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('message', 'Message field is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, company, phone, email, message } = req.body;

    try {
      const from = 'teamwheatfinance@gmail.com'; // Use the email address or domain you verified above
      const subject = 'Enquiry';
      const output = `
	  <p> You have a new enquiry </p>
	  <h3>Info :- </h3>
	  <ul>
			<li> First Name: ${firstname}</li>
			<li> Last Name: ${lastname}</li>
			<li> Company: ${company}</li>
			<li> Phone: ${phone}</li>
			<li> Email: ${email}</li>
			<li> Message: ${message}</li>
		</ul>

	  `;
      sendEmail(email, from, subject, output);

      return res.status(200).json('Message sent');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
