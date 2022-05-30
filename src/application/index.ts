import { strings } from '@angular-devkit/core';
import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { MzApplicationOptions } from './schema';

export function application(_options: MzApplicationOptions): Rule { 
  return (_tree: Tree, _context: SchematicContext) => {
    const applicationPath = strings.dasherize(_options.name)

    const sourceTemplates = url('./files')
    const sourceParametrizedTemplates = apply(sourceTemplates,[
      template({
        ..._options,
        ...strings
      }),
      move(applicationPath)
    ])

    return mergeWith(sourceParametrizedTemplates)(_tree, _context);
  };
}
