var exec = require('cordova/exec');

var iOSWidget = {
    updateWidget: function(text) {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, "iOSWidget", "updateWidget", [text]);
        });
    }
};

module.exports = iOSWidget;