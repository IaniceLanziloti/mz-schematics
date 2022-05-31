import { join }  from 'path'
import { Tree } from "@angular-devkit/schematics";
import { classify } from '@angular-devkit/core/src/utils/strings';
import { Pluralize } from '../utils/pluralize.util';

export class IdentifierModifier {
  public static type:string;

  public static addDomain(tree:Tree, rootDir:string,  domain:string):Tree {

    const pluralizedType = Pluralize.run(this.type)

    const identifiersPath = join(
      rootDir, 'shared', 'container', 'identifiers' );

    const identifierPath = join( identifiersPath, `application.${pluralizedType}.ts` );
    const identifierSource = tree.read(identifierPath)?.toString();

    if (!identifierSource) {
      throw new Error(`Could not find ${this.type} identifier`)  
    }

    const identifierSourceArray = identifierSource.split(/\n/);
    const routerName = classify(`${domain}Domain${classify(this.type)}`);

    identifierSourceArray.splice(5,0,`  ${routerName}: Symbol.for('${routerName}'),`);

    const newContent = identifierSourceArray.join('\n');
    
    tree.overwrite(identifierPath, newContent);

    return tree;
  }
}