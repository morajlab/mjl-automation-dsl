import { readFileSync } from 'fs';
import { resolve } from 'path';
import { inspect } from 'util';
import { XMLParser } from 'fast-xml-parser';
import type { X2jOptions } from 'fast-xml-parser';

const WORKFLOWS_PATH = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'packages',
  'workflows'
);

const parseXMLFile = (path: string) => {
  const parser_options: Partial<X2jOptions> = {
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: '@_',
    attributesGroupName: '@_',
    alwaysCreateTextNode: true,
    ignoreDeclaration: true,
    preserveOrder: true,
  };

  try {
    const parser = new XMLParser(parser_options);
    const xml_content = readFileSync(path, 'utf-8');

    return parser.parse(xml_content);
  } catch (err) {
    console.error(err);
  }
};

console.log(
  parseXMLFile(
    resolve(WORKFLOWS_PATH, 'github-starter-workflows', 'ci', 'blank.xml')
  )
);
