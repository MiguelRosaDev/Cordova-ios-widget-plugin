# Cordova iOS Widget Plugin

A Cordova plugin that enables iOS widgets in your application, providing seamless integration between your Cordova app and native iOS widget functionality.

## Features

- Static widgets with customizable content
- Interactive control widgets
- Live Activities support
- Real-time widget updates from your Cordova application
- UserDefaults integration for data sharing
- Support for iOS 14 and above

# Requirements

- iOS 14.0 or higher
- Cordova iOS 6.0.0 or higher
- Xcode 12.0 or higher
- Swift 5.0 or higher
- A valid Apple Developer account
- A physical iOS device for testing (widgets cannot be fully tested in simulator)

## Installation

```bash
cordova plugin add cordova-plugin-ios-widget
```

## Usage

### 1. Update the Widget
On the JavaScript side, invoke the `updateWidget` method to update the widget text:
```javascript
cordova.plugins.iosWidget.updateWidget("Widget Text", function(success) {
    console.log("Widget updated successfully!");
}, function(error) {
    console.error("Error updating widget:", error);
});
```
