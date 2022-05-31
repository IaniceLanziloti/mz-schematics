import { strings } from '@angular-devkit/core';
import { toUpperCase } from '../utils/functions/utils';

import { apply, branchAndMerge, chain, mergeWith, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { MzApplicationResourceOptions } from './schema';
import { ApplicationConfigReader } from '../utils/readers';
import { RouterIdentifierModifier } from '../utils/modifiers/router-identifier';
import { ControllerIdentifierModifier } from '../utils/modifiers/controller-identifier';
import { DomainControllersDtosModifier } from '../utils/modifiers/domain-controllers-dtos.modifier';
import { DomainControllersModifier } from '../utils/modifiers/domain-controllers.modifier';

function preLaunch(_options: MzApplicationResourceOptions) {
  const compiledOptions: MzApplicationResourceOptions = Object.assign({}, _options);
  return compiledOptions
}

function changeFiles(_options:MzApplicationResourceOptions) {
  return (tree:Tree) => {
    const configurationFile = new ApplicationConfigReader(tree).read();
    const rootDir = configurationFile['rootDir'];
    const { domain, name: resource } = _options;

    RouterIdentifierModifier.addResource(tree, rootDir, domain, resource);
    ControllerIdentifierModifier.addResource(tree, rootDir, domain, resource);

    DomainControllersDtosModifier.addResource(tree, rootDir, domain, resource);
    DomainControllersModifier.addResource(tree, rootDir, domain, resource);
  }
}

function createFiles(_options: MzApplicationResourceOptions):Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates,[
      template({
        ..._options,
        ...strings,
        toUpperCase
      })
    ])

    return mergeWith(sourceParametrizedTemplates)(tree, _context)

  }
}

export function resource(_options: any): Rule {
  const options = preLaunch(_options);

  return (tree: Tree, _context: SchematicContext) => {
    return branchAndMerge(chain([
      createFiles(options),
      changeFiles(options)
    ]))(tree, _context)
  };
}
