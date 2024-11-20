//
//  MyWidgetLiveActivity.swift
//  MyWidget
//
//  Created by Miguel Rosa on 20/11/2024.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct MyWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct MyWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: MyWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension MyWidgetAttributes {
    fileprivate static var preview: MyWidgetAttributes {
        MyWidgetAttributes(name: "World")
    }
}

extension MyWidgetAttributes.ContentState {
    fileprivate static var smiley: MyWidgetAttributes.ContentState {
        MyWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: MyWidgetAttributes.ContentState {
         MyWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: MyWidgetAttributes.preview) {
   MyWidgetLiveActivity()
} contentStates: {
    MyWidgetAttributes.ContentState.smiley
    MyWidgetAttributes.ContentState.starEyes
}
