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
  var valid =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.location
      ? true
      : false;
  if(!valid)
    msg = Object.keys(req.body);
  else {
    // connect to google api
    var web_site = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=' + API_KEY;
    https.get(web_site, (resp) => {
      let data = '';
   
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
   
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log("Proper msg:");
        msg = JSON.parse(data).results[0].formatted_address;
        console.log(msg);
      });

    }).on("error", (err) => {
        msg = Unkown_Input_ERR
    });
  }
// return json response
return res.json({
    speech: msg,
    displayText: msg,
    source: "Hajj-Assistant-Engine", 
    queryResult : {
      "fulfillmentText": msg,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              msg
            ]
          }
        }
      ]
    }
    
  });
  // end of reutrn
});

// end of post method


restService.get("/location", function(req, res) {
  var valid =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.location
      ? true
      : false;
  if(!valid)
    msg = Object.keys(req.body);
  else {
    // connect to google api
    var web_site = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=' + API_KEY;
    https.get(web_site, (resp) => {
      let data = '';
   
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
   
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log("Proper msg:");
        msg = JSON.parse(data).results[0].formatted_address;
        console.log(msg);
      });

    }).on("error", (err) => {
        msg = Unkown_Input_ERR
    });
  }
// return json response
return res.json({
    speech: msg,
    displayText: msg,
    source: "Hajj-Assistant-Engine", 
    queryResult : {
      "fulfillmentText": msg,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              msg
            ]
          }
        }
      ]
    }
    
  });
  // end of reutrn
});

//end of get method

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
