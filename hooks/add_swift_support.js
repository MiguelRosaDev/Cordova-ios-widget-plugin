const fs = require('fs');
const path = require('path');
const xcode = require('xcode');

module.exports = function(context) {
    const projectRoot = context.opts.projectRoot;
    const platformPath = path.join(projectRoot, 'platforms', 'ios');
    const config = getConfigParser(context, path.join(projectRoot, 'config.xml'));

    const projectName = config.name();
    const pbxprojPath = path.join(platformPath, projectName + '.xcodeproj', 'project.pbxproj');
    const xcodeProject = xcode.project(pbxprojPath);
    console.log('erro_swift- projectName:', projectName);
    console.log('erro_swift- pbxprojPath:', pbxprojPath);
    console.log('erro_swift- xcodeProject:', xcodeProject);

    xcodeProject.parseSync();

    const buildConfigs = xcodeProject.pbxXCBuildConfigurationSection();

    for (const configName in buildConfigs) {
        if (!configName.includes('_comment')) {
            const buildConfig = buildConfigs[configName];
            console.log('erro_swift- Config Name:', configName, 'Value:', buildConfig);
            if (buildConfig.buildSettings) {
                if (!buildConfig.buildSettings['SWIFT_VERSION']) {
                    buildConfig.buildSettings['SWIFT_VERSION'] = '5.3';
                    buildConfig.buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = '18.0';
                    console.log('erro_swift Set SWIFT_VERSION to 5.3 for build configuration:', buildConfig.name);
                } else {
                    buildConfig.buildSettings['SWIFT_VERSION'] = '5.3';
                    buildConfig.buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = '18.0';
                    console.log('erro_swift- Set SWIFT_VERSION ja configurado:');
                    }
            }
        }
    }

    fs.writeFileSync(pbxprojPath, xcodeProject.writeSync());
    console.log('erro_swift- Successfully updated SWIFT_VERSION in project.pbxproj');
};

function getConfigParser(context, configPath) {
    const ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
    return new ConfigParser(configPath);
}
