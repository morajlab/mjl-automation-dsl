import { readFileSync } from 'fs';
import { resolve } from 'path';
import { inspect } from 'util';
import { dump } from 'js-yaml';
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

const tokens = {
  event: 'on',
};

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

const compiler = () => {
  const yaml_object = {};
  const object = parseXMLFile(
    resolve(WORKFLOWS_PATH, 'github-starter-workflows', 'ci', 'blank.xml')
  );

  (object[0].Workflow as Object[]).forEach((item) => console.log(item));
};

// console.log(compiler());
compiler();
