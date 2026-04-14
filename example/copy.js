const fs = require('fs-extra');

const filenames = ['android/src',
                  'android/libs',
                  'android/build.gradle',
                  'android/proguard-rules.pro',
                  'ios',
                  'module',
                  'src',
                  'index.js',
                  'package.json',
                  'ReactNativeIOSLibrary.podspec'];

let srcPath  = '';
const destPath = 'node_modules/@ihealth/ihealthlibrary-react-native/';

async function task(filename) {
  try {
    const exists = await fs.pathExists(destPath + filename)
    console.log(`${filename} is exists ${exists}`);
    if (exists) {
      await fs.remove(destPath + filename)
    }
    const result = await fs.copy(srcPath + filename, destPath + filename);
    console.log(`${filename} copied!`);
  } catch (err) {
    console.error(err)
  }
}

async function runAll() {
    const data = await fs.readFile('.path', 'utf8');
    srcPath = data.split('=')[1].trim();
    // Run sequentially to avoid race conditions when removing+copying directories
    for (const filename of filenames) {
        await task(filename);
    }
    console.log('✅ All files synced.');
}

runAll().catch(console.error);

