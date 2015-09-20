/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express  = require('express'),
  app        = express(),
  path       = require('path'),
  bluemix    = require('./config/bluemix'),
  extend     = require('util')._extend,
  watson     = require('watson-developer-cloud'),
  cors       = require('cors'),
  utilService = require('./serviceUtils/utilService'),
  inferenceEngine = require('./serviceUtils/inferenceEngineAPI')


app.use(cors())
// Bootstrap application settings
require('./config/express')(app);

// if bluemix credentials exists, then override local
var credentials =  extend({
  url: 'https://gateway.watsonplatform.net/dialog/api',
  username: 'be8355a5-ba4f-464a-9341-19b547a53468',
  password: 'pmiL5RhCM6T6',
  version: 'v1'
}, bluemix.getServiceCreds('dialog')); // VCAP_SERVICES

var dialog_id = process.env.DIALOG_ID || 'f4b4a9ac-4791-4627-bfc9-d79500a9fcbb';

// Create the service wrapper
var dialog = watson.dialog(credentials);

//initially set as global variable
var symptoms = ["headache", "vomiting"];
var utility = new utilService();
var inferenceEngineAPI = new inferenceEngine();

app.post('/conversation', function(req, res, next) {

  var params = extend({ dialog_id: dialog_id }, req.body);
    //here parse the question and get the necessary data

    if(req.body.input != null && req.body.input.indexOf("I have") >= 0)
        symptoms = utility.extractList(req.body.input,"I have");


  dialog.conversation(params, function(err, results) {
    if (err)
      return next(err);
    else
      res.json({ dialog_id: dialog_id, conversation: results});
  });
});

app.post('/profile', function(req, res, next) {
  var params = extend({ dialog_id: dialog_id }, req.body);
  dialog.getProfile(params, function(err, results) {
    if (err)
      return next(err);
    else
      res.json(results);
  });
});

app.get('/diagnosis',function(req,res,next){

    //list all the necessary params here
    var app_id = '944eff34', app_key = 'c54cc1d1c7ded416a9d9405b6a357488';

    var params = {}
    params.app_id = app_id;
    params.app_key = app_key;


    var list = [];
    symptoms.forEach(function(value){

        inferenceEngineAPI.getObservation(params, value.trim(),function(err,results){

            console.log(symptoms)

            list.push(results.body != null ? results.body.id : "*");

            if (list.length == symptoms.length) {

                params.body = utility.constructDiagnosisBody("",list);

                inferenceEngineAPI.getDiagnosis(params,function(err1,results1){

                    if(err1)
                        return next(err1);
                    else {
                        res.json(results1.body.conditions ? results1.body.conditions[0] : 'No Match');

                    }
                });
            }


        });
    });




    params.body = require("./serviceUtils/test.json");




});

app.get('/patientprofile', function(req,res,next){

    res.json({'name' : 'John Smith', 'age': '29'})

})

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);