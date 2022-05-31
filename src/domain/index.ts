import {  strings  } from '@angular-devkit/core';
import { toUpperCase } from '../utils/utils';
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
import { ControllerIdentifierModifier } from '../modifiers/controller-identifier';
import { RouterIdentifierModifier } from '../modifiers/router-identifier';
import { ApplicationConfigFinder } from '../utils/application-config.finder';
import { MzApplicationDomainOptions } from './schema';

function preLaunch( _options:MzApplicationDomainOptions): MzApplicationDomainOptions {
  const compiledOptions:MzApplicationDomainOptions = Object.assign({}, _options);

  compiledOptions.path = _options.path || process.cwd()
 
  return compiledOptions;
}

function addDomainToIdentifiers (_options: MzApplicationDomainOptions): Rule {
  return (tree:Tree) => {
    const currentLocation = _options.path || '';
    const configurationFilePath = new ApplicationConfigFinder(tree).find(currentLocation);

    if (!configurationFilePath) {
      throw new Error(`Could not find configuration file.`);
    }

    const configurationFile = JSON.parse(tree.read(configurationFilePath)?.toString()|| `{"rootDir":"src"}`);
    const rootDir = configurationFile['rootDir'] ;

    RouterIdentifierModifier.addDomain(tree, rootDir, _options.name);
    ControllerIdentifierModifier.addDomain(tree, rootDir, _options.name);
    
    return tree
  }
}
export function createFiles(_options: MzApplicationDomainOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const sourceTemplates = url('./files')

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
