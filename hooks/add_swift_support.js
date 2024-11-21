const fs = require('fs');
const path = require('path');
const xcode = require('xcode');

module.exports = function(context) {
    const projectRoot = context.opts.projectRoot;
    const iosPlatformPath = path.join(projectRoot, 'platforms', 'ios');

    // Verificar se a plataforma iOS está disponível
    if (!fs.existsSync(iosPlatformPath)) {
        console.log('add_swift_support iOS platform does not exist. Skipping SWIFT_VERSION and DEPLOYMENT_TARGET update.');
        return;
    }

    const config = getConfigParser(context, path.join(projectRoot, 'config.xml'));
    const projectName = config.name();
    const pbxprojPath = path.join(iosPlatformPath, projectName + '.xcodeproj', 'project.pbxproj');

    console.log('add_swift_support Project Name:', projectName);
    console.log('add_swift_support PBXProj Path:', pbxprojPath);

    // Verificar se o arquivo project.pbxproj existe
    if (!fs.existsSync(pbxprojPath)) {
        console.error('project.pbxproj not found at:', pbxprojPath);
        return;
    }

    const xcodeProject = xcode.project(pbxprojPath);
    xcodeProject.parseSync();

    const buildConfigs = xcodeProject.pbxXCBuildConfigurationSection();

    for (const configName in buildConfigs) {
        if (!configName.endsWith('_comment')) {
            const buildConfig = buildConfigs[configName];
            if (buildConfig.buildSettings) {
                // Configurar SWIFT_VERSION e IPHONEOS_DEPLOYMENT_TARGET
                buildConfig.buildSettings['SWIFT_VERSION'] = '5.3';
                buildConfig.buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = '18.0';
                console.log(`add_swift_support Updated SWIFT_VERSION and DEPLOYMENT_TARGET for configuration: ${buildConfig.name}`);
            }
        }
    }

    fs.writeFileSync(pbxprojPath, xcodeProject.writeSync());
    console.log('add_swift_support Successfully updated SWIFT_VERSION and DEPLOYMENT_TARGET in project.pbxproj');
};

function getConfigParser(context, configPath) {
    const ConfigParser = require('cordova-common').ConfigParser;
    return new ConfigParser(configPath);
}
