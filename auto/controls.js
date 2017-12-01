const fs = require('fs');
const path = require('path');
const glob = require('glob');

const comment =
  '// This file is automatically generated by script "auto/controls", do not edit.\n\n';

let controls = comment;

glob.sync('src/controls/**/*.vue').forEach(filePath => {
  let fileName = path.basename(filePath).replace(/\.vue$/, '');
  controls += `export { default as ${fileName} } from '${filePath}';\n`;
});

fs.writeFileSync('src/controls/index.ts', controls);

let controlsStyle =
  comment +
  `@charset 'UTF-8';

@import 'controls/base/variables';
@import 'controls/base/mixins';
@import 'controls/base/media';
@import 'controls/base/reset';

`;

glob.sync('src/controls/**/*.scss').forEach(filePath => {
  if (filePath.startsWith('src/controls/base/')) return;
  filePath = filePath.replace('src/', '').replace(/\.scss/, '');
  controlsStyle += `@import '${filePath}';\n`;
});

fs.writeFileSync('src/index.scss', controlsStyle);
