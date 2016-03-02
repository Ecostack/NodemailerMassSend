'use strict';

const bluebird = require('bluebird');
const async = require('async');
const fs = require('fs');


const EmailService = require('./app/EmailService');

let emails = fs.readFileSync('emails.txt', "UTF-8").split("\n");

async.eachSeries(emails, function (email, callback) {
    EmailService.sendToMail(email, function (err) {
        if (err) {
            console.log(err);
        }
        setTimeout(function () {
            console.log('sending email to ', email, ' time:', new Date().toISOString());
            callback(err);
        }, 1000);
    })
}, function (err) {
    if (err) {
        console.log('error ', err);
    }
    console.log('emails have been sents');
    process.exit();
});