"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const API_KEY = 'AIzaSyAHAPL8XQGg7SWSyvCzfYSFrpv1xMHJpNA';
const Unkown_Input_ERR = "Seems like some problem. Speak again.";
const Invalid_ERR = "Unkown input";

const restService = express();
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

var msg = '';
restService.post("/location", function(req, res) {
  msg =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.location
      ? ''
      : Invalid_ERR;

return res.json({
    speech: msg,
    displayText: msg,
    source: "Hajj-Assistant-Engine", 
    "fulfillmentText": msg,
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            msg
          ]
        }
      }
    ],
  });
  // end of reutrn
});
