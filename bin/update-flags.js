

const { readdirSync, writeFileSync } = require("fs");
const { join, basename, extname } = require("path");

const SVG_REGEXP = /\.svg$/i;
const FLAGS_DIR = join(process.cwd(), 'src/assets/flags');
const FLAGS_IMG_DIR = join(FLAGS_DIR, 'img');
const OUTPUT_FILE = join(FLAGS_DIR, 'index.ts');
const flagsFiles = readdirSync(FLAGS_IMG_DIR).filter(e => SVG_REGEXP.test(e));
const flagsNames = flagsFiles.map(e => basename(e, extname(e)));
const flagsIds = flagsNames.map(e => e.replace(/[^\w]+/ig, ''));

writeFileSync(OUTPUT_FILE, (''
  + flagsFiles
    .map((file, i) => `import ${flagsIds[i]} from "./img/${file}";`)
    .join('\n')
  + '\n\n'
  + 'export const flags = {\n'
  + flagsNames
    .map((e, i) => '  \'' + e + '\': ' + flagsIds[i] + ',')
    .join('\n')
  + '\n'
  + '};'
  + '\n\n'
  + 'export const FLAGS = flags;'
));