"use strict";
// requirements
const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
// API keys
const API_KEY = 'AIzaSyAHAPL8XQGg7SWSyvCzfYSFrpv1xMHJpNA';
// Error Messages
const Unkown_Input_ERR = "Seems like some problem. Speak again.";
const Invalid_ERR = "Unkown input";

// define functions
function get_address(lat, lng) {
    var address = '';
    var web_site = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' +
        API_KEY;
    https.get(web_site, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("Proper address:");
            address = JSON.parse(data).results[0].formatted_address;

        });

    }).on("error", (err) => {
        address = Unkown_Input_ERR;
    });

    console.log(address);
    return address;
}

function get_lat_lng() {
    var web_site = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + API_KEY;
    const options = {
        path: web_site,
        method: 'POST'
    };
    var out = [];
    https.request(options, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            out[0] = JSON.parse(data).location.lat;
            out[1] = JSON.parse(data).location.lng;
        });
    }).on("error", (err) => {
        console.log("Error:")
        return Unkown_Input_ERR;
    });

    return out;
}


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
        req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.location ?
        true :
        false;
    if (!valid)
        msg = Invalid_ERR;
    else {
        // connect to google api
        // connect to google api
          //var latlng = get_lat_lng();
          //msg = get_address(latlng[0],latlng[1]);
          var lat = 21.4858;
          var lng = 39.1925;
          var web_site = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' +
          API_KEY;
          https.get(web_site, (resp) => {
          let data = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
              data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              console.log("Proper address:");
              msg = JSON.parse(data).results[0].formatted_address;
              });

          }).on("error", (err) => {
              msg = Unkown_Input_ERR;
          });
    }
    // return json response
    return res.json({
        speech: msg,
        displayText: msg,
        source: "Hajj-Assistant-Engine",
        queryResult: {
            "fulfillmentText": msg,
            "fulfillmentMessages": [{
                "text": {
                    "text": [
                        msg
                    ]
                }
            }]
        }

    });
    // end of reutrn
});
// end of post method


restService.get("/location", function(req, res) {
    var valid =
        req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.location ?
        true :
        false;
    if (!valid)
        msg = Invalid_ERR;
    else {
          // connect to google api
          //var latlng = get_lat_lng();
          //msg = get_address(latlng[0],latlng[1]);
          var lat = 21.4858;
          var lng = 39.1925;
          var web_site = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' +
          API_KEY;
          https.get(web_site, (resp) => {
          let data = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
              data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              console.log("Proper address:");
              msg = JSON.parse(data).results[0].formatted_address;

          });

      }).on("error", (err) => {
          msg = Unkown_Input_ERR;
      });
    }
    // return json response
    return res.json({
        speech: msg,
        displayText: msg,
        source: "Hajj-Assistant-Engine",
        queryResult: {
            "fulfillmentText": msg,
            "fulfillmentMessages": [{
                "text": {
                    "text": [
                        msg
                    ]
                }
            }]
        }

    });
    // end of reutrn
});

//end of get method

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
