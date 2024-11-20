var exec = require('cordova/exec');

var iOSWidget = {
    updateWidget: function(text) {
        exec(successCallback, errorCallback, "AndroidWidget", "updateWidget", [text]);
        }
    }
};

module.exports = iOSWidget;
