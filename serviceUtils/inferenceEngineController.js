/**
 * Created by marcybautista on 9/19/15.
 */

var InferenceEngineAPI = require('./inferenceEngineAPI');

var app_id = '944eff34', app_key = 'c54cc1d1c7ded416a9d9405b6a357488';


function InferenceEngineController(){

}

module.exports = function getDiagnosis(params,callback) {

    params.app_id = app_id;
    params.app_key = app_key;
    console.log("TEST")
    InferenceEngineAPI.getDiagnosis(params,callback);

};

module.exports = function getObservationBySymptoms(params,phrase,callback) {

    params.app_id = app_id;
    params.app_key = app_key;

    //InferenceEngineAPI.get


};

module.exports = InferenceEngineController;
