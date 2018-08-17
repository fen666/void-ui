import * as path from 'path';
import * as fs from 'fs';
import * as globby from 'globby';
import chalk from 'chalk';

/**
 * Replace the matching part with alias in the path.
 * @param p the path
 */
function alias(p: string): string {
  return p
    .replace(/^docs/, '@docs')
    .replace(/^lib/, '@void/ui/lib')
    .replace(/\.tsx?$/, '');
}

/**
 * Use files paths to generate export/import statements.
 * @param files paths of files
 * @param noVue forbidden .vue files
 */
function generateIndexTs(files: string[], noVue: boolean = true): string {
  return files
    .sort()
    .map(f => {
      if (f.endsWith('.vue')) {
        if (noVue) {
          throw new Error('');
        } else {
          const name: string = path.basename(f).replace(/\.vue$/, '');

          return `export { default as ${name} } from '${alias(f)}';\n`;
        }
      }
      if (f.endsWith('.ts') || f.endsWith('.tsx')) {
        return `export * from '${alias(f)}';\n`;
      }
      throw new Error(`Cannot import ${path.extname(f)} file (${f}) in .ts file.`);
    })
    .join('');
}

/**
 * Use files paths to generate export/import statements.
 * @param files paths of files
 */
function generateIndexScss(files: string[]): string {
  return files
    .sort()
    .map(f => {
      if (f.endsWith('.scss')) {
        return `@import '~${alias(f)}';\n`;
      }
      throw new Error(`Cannot import ${path.extname(f)} file (${f}) in .scss file.`);
    })
    .join('');
}

function generateComments(comments: string[], jsdoc: boolean = true): string {
  return jsdoc
    ? `
/**
${comments.map(c => ` * ${c}`).join('\n')}
 */
`
    : comments.map(c => `// ${c}`).join('\n');
}

interface GenerateOptions {
  patterns: string | string[];
  output: string;
  comments?: string[];
  noVue?: boolean;
}

const banner: string = generateComments(
  [
    'Do not edit this file.',
    'It is auto generated by script "scripts/gen-files.ts".',
    'To update this file, please run command "yarn gen-files".',
  ],
  false,
);

/**
 * Auto generate source code
 */
async function generateFiles(options: GenerateOptions): Promise<void> {
  if (!options.output.endsWith('ts') && !options.output.endsWith('.scss')) {
    throw new Error(
      `Cannot generate "${options.output}", ${path.extname(
        options.output,
      )} file is unsupported.`,
    );
  }

  const comments: string =
    options.comments && options.comments.length > 0
      ? generateComments(options.comments)
      : '';

  const files: string[] = await globby([
    ...(Array.isArray(options.patterns) ? options.patterns : [options.patterns]),
    `!${options.output}`,
  ]);

  const content: string = `${banner}
${comments}
${
    options.output.endsWith('.ts')
      ? generateIndexTs(files, options.noVue)
      : generateIndexScss(files)
  }`;

  return new Promise<void>((resolve, reject) => {
    fs.readFile(options.output, 'utf-8', (readError, oldContent) => {
      if (readError) {
        return reject(readError);
      }
      if (content === oldContent) {
        console.log(
          chalk.bgCyan.black(' Nothing Changed '.padEnd(20, ' ')),
          chalk.green(options.output),
        );

        return resolve();
      }

      fs.writeFile(options.output, content, writeError => {
        if (writeError) {
          return reject(writeError);
        }
        console.log(
          chalk.bgCyanBright.black(' File Updated '.padEnd(20, ' ')),
          chalk.greenBright(options.output),
        );

        return resolve();
      });
    });
  });
}

const optionsList: GenerateOptions[] = [
  {
    patterns: [
      'lib/components/**/*.(tsx|ts)',
      '!lib/components/**/*.d.ts',
      '!lib/components/base/**/*.(tsx|ts)',
      'lib/components/base/index.ts',
    ],
    output: 'lib/components/all.ts',
    comments: ['All components of void-ui'],
  },
  {
    patterns: [
      'lib/components/**/*.scss',
      '!lib/components/base/**/*.scss',
      'lib/components/base/index.scss',
    ],
    output: 'lib/components/all.scss',
    comments: ['All components style of void-ui'],
  },
];
Promise.all(optionsList.map(generateFiles)).catch(console.error);
