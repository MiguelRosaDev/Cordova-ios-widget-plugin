//
//  MyWidgetBundle.swift
//  MyWidget
//
//  Created by Miguel Rosa on 20/11/2024.
//

import WidgetKit
import SwiftUI

@main
struct MyWidgetBundle: WidgetBundle {
    var body: some Widget {
        MyWidget()
        MyWidgetControl()
        MyWidgetLiveActivity()
    }
}
