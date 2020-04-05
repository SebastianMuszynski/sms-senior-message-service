const Message = require('../models/Message');

exports.all = (req, res) => {
  Message.find().sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'All',
      messages: msgs,
    });
  });
};

exports.info = (req, res) => {
  Message.find({ category: 'info' }).sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'Info',
      messages: msgs,
    });
  });
};

exports.dailyHelp = (req, res) => {
  Message.find({ category: 'daily_help' }).sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'Daily Help',
      messages: msgs,
    });
  });
};

exports.medicalAssistance = (req, res) => {
  Message.find({ category: 'medical_assistance' }).sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'Medical Assistance',
      messages: msgs,
    });
  });
};

exports.loneliness = (req, res) => {
  Message.find({ category: 'loneliness' }).sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'Loneliness',
      messages: msgs,
    });
  });
};

exports.other = (req, res) => {
  Message.find({ category: 'other' }).sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'Other',
      messages: msgs,
    });
  });
};

exports.subscriptions = (req, res) => {
  Message.find({ category: 'subscriptions' }).sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'Subscriptions',
      messages: msgs,
    });
  });
};

exports.services = (req, res) => {
  Message.find({ category: 'services' }).sort({ createdAt: 'desc' }).then((msgs) => {
    res.render('messages/list', {
      title: 'Services',
      messages: msgs,
    });
  });
};

// POST response
exports.response = (req, res) => {
  req.flash('success', { msg: `Answer sent to ${req.body.recipient}` });
  res.redirect('/');
};