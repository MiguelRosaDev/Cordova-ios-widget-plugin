#import "CDViOSWidget.h"
#import <WidgetKit/WidgetKit.h>

@implementation CDViOSWidget

- (void)updateWidget:(CDVInvokedUrlCommand*)command
{
    NSString* text = [command.arguments objectAtIndex:0];
    
    // Store the text in UserDefaults (shared between app and widget)
    [[NSUserDefaults standardUserDefaults] setObject:text forKey:@"widgetText"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    // Reload the widget
    if (@available(iOS 14.0, *)) {
        [WidgetCenter.sharedCenter reloadAllTimelinesWithHandler:^(NSError * _Nullable error) {
            if (error) {
                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription] callbackId:command.callbackId];
            } else {
                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
            }
        }];
    } else {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"WidgetKit is not available"] callbackId:command.callbackId];
    }
}

@end