import { strings  } from '@angular-devkit/core';
import { template, url, apply, Rule, SchematicContext, Tree, mergeWith, move } from '@angular-devkit/schematics';
import { MzApplicationDomainOptions } from './schema';

export function domain(_options: MzApplicationDomainOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const applicationPath = strings.dasherize(_options.application)

    const sourceTemplates = url('./files')

    const sourceParametrizedTemplates = apply(sourceTemplates,[
      template({
        ..._options,
        ...strings
      }),
      move(applicationPath)
    ])

    return mergeWith(sourceParametrizedTemplates)(_tree, _context)
  };
}
