var exec = require('cordova/exec');

var iOSWidget = {
    updateWidget: function(text, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "AndroidWidget", "updateWidget", [text]);
        }
    }
};

module.exports = iOSWidget;
