/**
 * Created by marcybautista on 9/19/15.
 */

'use strict';

var requestFactory = require('../node_modules/watson-developer-cloud/lib/requestwrapper');

var url = "https://api.infermedica.com/v1/"



function InferenfenceEngineAPI(){


}

module.exports = function getDiagnosis(params, callback){

    params = params || {};

    var parameters = {
        options: {
            url: url+'/diagnosis',
            method: 'POST',
            json: true,
            path: params,
            formData: params
        },
        requiredParams: ['app_id', 'app_key'],
        defaultOptions: this._options
    };
    return requestFactory(parameters, callback);

};

module.export = function getObservationBySymptoms(params,phrase,callback) {

    var parameters = {
        options: {
            url: url+'/lookup?phrase='+phrase,
            method: 'GET',
            json: true,
            path: params,
            qs: pick(params, ['client_id'])
        },
        requiredParams: ['app_id', 'app_key'],
        defaultOptions: this._options
    };
    return requestFactory(parameters, callback);
};



