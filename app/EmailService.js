'use strict';

var nodemailer = require('nodemailer');
// create a defaultTransport using gmail and authentication that are
// stored in the `config.js` file.
var config = require('../config.json');

var defaultTransport = nodemailer.createTransport(config.email.method, config.email.settings);


module.exports = {
    sendToMail: function(mailaddress,cb)  {
        var options = {
            to: mailaddress,
            replyTo: config.from,
            from: config.from,
            subject: 'THIS IS A TEST EMAIL',
            html: '<p>hi!</p>'
        };

        module.exports.send(options, cb);
    },
    send:function  (options, cb) {

        var html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' + options.html;
        var emailOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            html: html
//        generateTextFromHTML: true,
//        text: text
        };
        if (options.attachments) {
            emailOptions['attachments'] = options.attachments;
        }
        if (options.replyTo) {
            emailOptions['replyTo'] = options.replyTo;
        }
        defaultTransport.sendMail(emailOptions, function (err) {
            if (err) {
                console.log('email error: ', err);
            }
            return cb(err, options.html);
        });
    }
};