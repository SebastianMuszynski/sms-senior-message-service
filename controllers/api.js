const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const validator = require('validator');
const Message = require('../models/Message');

/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
exports.postTwilio = (req, res, next) => {
  const validationErrors = [];
  if (validator.isEmpty(req.body.recipient)) validationErrors.push({ msg: 'Phone number is required.' });
  if (validator.isEmpty(req.body.answer)) validationErrors.push({ msg: 'Answer cannot be blank.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    console.log(validationErrors);
    return res.redirect('/');
  }

  const message = {
    to: req.body.recipient,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: req.body.answer
  };

  twilio.messages.create(message).then((sentMessage) => {
    req.flash('success', { msg: `Text sent to ${sentMessage.to}` });
    console.log(`Text sent to ${sentMessage.to}`);
    res.redirect('/');
  }).catch((err) => {
    console.log('ERROR: Could not send the message.\n', err);
    req.flash('errors', { msg: 'An error occurred while sending the message. Please try again soon.' });
    return res.redirect('/');
  });
};

/**
 * POST /newQuestion
 * Receive a new question
 */
exports.newQuestion = (req, res, next) => {

  const validationErrors = [];
  if (validator.isEmpty(req.body.From)) validationErrors.push({ msg: 'Phone number is required.' });
  if (validator.isEmpty(req.body.Body)) validationErrors.push({ msg: 'Message cannot be blank.' });

  if (validationErrors.length) {
    console.log(validationErrors);
    return next();
  }

  const msgFrom = req.body.From;
  const msgBody = req.body.Body;

  console.log(`New message received from: ${msgFrom}`);
  new Message({ from: msgFrom, body: msgBody }).save().then(() => 'New message saved.');
};