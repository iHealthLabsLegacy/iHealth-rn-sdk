// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const sdkRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Required because @ihealth/ihealthlibrary-react-native is installed as a
// symlink (file:../ in package.json). Metro does not follow symlinks by
// default, so we add the SDK root as a watchFolder and only point the resolver
// at this project's node_modules. This guarantees that react/react-native
// (and other peer deps) always resolve to the example's installed copy and
// the SDK never pulls in a duplicate from its own node_modules.
config.watchFolders = [sdkRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

// Force any react-native / react import that originates from the linked SDK
// to resolve to the example app's installed version. This prevents the
// "Module has not been registered as callable" crash on Android Old Arch when
// two different react-native copies are otherwise reachable through the
// symlink.
const peerDeps = ['react-native', 'react'];
config.resolver.extraNodeModules = peerDeps.reduce((acc, name) => {
  acc[name] = path.resolve(projectRoot, 'node_modules', name);
  return acc;
}, {});

// Ignore the SDK's own node_modules so Metro never accidentally bundles a
// second copy of react-native (the SDK installs RN as a devDependency for
// codegen tests).
const escapedSdkNodeModules = path
  .resolve(sdkRoot, 'node_modules')
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
config.resolver.blockList = new RegExp(`^${escapedSdkNodeModules}/.*$`);

module.exports = config;
