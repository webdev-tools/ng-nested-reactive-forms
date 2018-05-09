/*
 * Sync the lib version with the main package.json file
 *
 */
const path = require('path');
const { writeFileSync } = require('fs');

const rootFolder = path.resolve(__dirname, '../');
const mainPackageJsonPath = path.join(rootFolder, 'package.json');
const libPackageJsonPath = path.join(rootFolder, 'src/ng-nrforms/package.json');

const mainPackageJson = require(mainPackageJsonPath);
const libPackageJson = require(libPackageJsonPath);


['name', 'version', 'license', 'description', 'repository', 'bugs', 'homepage'].forEach((key) => {
  libPackageJson[key] = mainPackageJson[key];
});


const libPackageJsonContent = JSON.stringify(libPackageJson, null, 2) + '\n';

try {
  writeFileSync(libPackageJsonPath, libPackageJsonContent);

  console.log('Sync Lib version success.');
  console.log(`Package version: ${mainPackageJson.version}`);
} catch (e) {
  console.error(e);
  process.exitCode = 5;
}
