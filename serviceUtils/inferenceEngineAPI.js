/**
 * Created by marcybautista on 9/19/15.
 */

'use strict';

var request= require('request');

var url = "https://api.infermedica.com/v1/"



function InferenceEngineAPI(){


}

InferenceEngineAPI.prototype.getDiagnosis = function (params,callback) {

    params = params || {};

    var parameters = {
        options: {
            url: 'https://api.infermedica.com/v1/diagnosis',
            method: 'POST',
            json: true,
            body: params.body,
            headers : {
                app_id: params.app_id,
                app_key: params.app_key
            }
        },
        requiredParams: ['app_id', 'app_key'],
        defaultOptions: this._options
    };

    return request(parameters.options,callback);
    //return requestFactory(parameters, callback);

};

InferenceEngineAPI.prototype.getObservation = function(params,phrase,callback){

    params = params || {};

    var parameters = {
        options: {
            url: 'https://api.infermedica.com/v1/lookup?phrase='+phrase,
            method: 'GET',
            json: true,
            headers : {
                app_id: params.app_id,
                app_key: params.app_key
            }
        },
        requiredParams: ['app_id', 'app_key'],
        defaultOptions: this._options
    };


    return request(parameters.options,callback);
}


module.exports = InferenceEngineAPI;