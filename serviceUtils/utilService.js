/**
 * Created by marcybautista on 9/19/15.
 */


function UtilService () {

}


UtilService.prototype.extractList = function(str, startString) {



 var substr = str.substr(startString.length)

  return substr.split(",")

};

UtilService.prototype.constructDiagnosisBody = function(param,list) {

    var body = {};

    body.sex = 'male';
    body.age = 29;

    var evidence = [];
    list.forEach(function(value){
       evidence.push({"id" : value, "choice_id": "present"})
    });

    body.evidence = evidence;

    return body;
}


module.exports = UtilService


