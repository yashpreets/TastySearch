exports.rtrim = function(str, delimiter) {
    if(str == undefined || str.length == 0 || delimiter == undefined || delimiter.length == 0){
        return str;
    }
    var len = delimiter.length;
    if(str.substr(str.length-len, str.length) == delimiter) {
        return str.substr(0, str.length-len);
    }
    else {
        return str;
    }
};

exports.trim = function(str, delimiter) {
    var newStr = this.rtrim(str, delimiter);
    return this.ltrim(newStr, delimiter);
};

exports.ltrim = function(str, delimiter) {
    var len = delimiter.length;
    if(str.substr(0, len) == delimiter) {
        return str.substr(len, str.length);
    }
    return str;
},

exports.isEmpty = function(str) {
    return (!str || 0 == str.length);
};

exports.endRequest = function(res,status,body){
    res.status(status).send(body);
    res.end;
};