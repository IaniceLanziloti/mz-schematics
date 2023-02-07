import {  strings  } from '@angular-devkit/core';
import { toUpperCase } from '../utils/functions/utils';
import { 
  branchAndMerge,
  template,
  url,
  apply,
  Rule,
  SchematicContext,
  Tree,
  mergeWith,
  chain 
} from '@angular-devkit/schematics';
import { ControllerIdentifierModifier, RouterIdentifierModifier } from '../utils/modifiers';
import { MzApplicationDomainOptions } from './schema';
import { ApplicationConfigReader } from '../utils/readers';

function preLaunch( _options:MzApplicationDomainOptions): MzApplicationDomainOptions {
  const compiledOptions:MzApplicationDomainOptions = Object.assign({}, _options);

  compiledOptions.path = _options.path || process.cwd()
 
  return compiledOptions;
}

function addDomainToIdentifiers (_options: MzApplicationDomainOptions): Rule {
  return (tree:Tree) => {
    const currentLocation = _options.path || '';
    const configurationFile = new ApplicationConfigReader(tree).read(currentLocation);
    const rootDir = configurationFile['rootDir'];

    RouterIdentifierModifier.addDomain(tree, rootDir, _options.name);
    ControllerIdentifierModifier.addDomain(tree, rootDir, _options.name);
    
    return tree
  }
}

function createFiles(_options: MzApplicationDomainOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates,[
      template({
        ..._options,
        ...strings,
        toUpperCase
      }),
    ])

    return mergeWith(sourceParametrizedTemplates)(tree, _context)
  };
}

export function domain(_options: MzApplicationDomainOptions): Rule {
  const options = preLaunch(_options);

  return (tree: Tree, _context: SchematicContext) => {
    return branchAndMerge(chain([
      createFiles(options),
      addDomainToIdentifiers(options)
    ]))(tree, _context)
  };
}
