import { join }  from 'path'
import { Tree } from "@angular-devkit/schematics";
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { Pluralize } from '../functions/pluralize.util';

export class IdentifierModifier {
  public static type:string;

  public static addDomain(tree:Tree, rootDir:string,  domain:string):Tree {

    const pluralizedType = Pluralize.run(this.type)

    const identifiersPath = join(
      rootDir, 'shared', 'container', 'identifiers' );

    const identifierPath = join( identifiersPath, `application-${pluralizedType}.identifier.ts` );
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

  public static addResource(tree:Tree, rootDir:string,  domain:string, resource:string):Tree {

    const pluralizedType = Pluralize.run(this.type)

    const identifiersPath = join(
      rootDir, 'domains', domain, 'identifiers' );

    const identifierPath = join( identifiersPath, `${dasherize(domain)}-${pluralizedType}.identifier.ts` );
    const identifierSource = tree.read(identifierPath)?.toString();

    if (!identifierSource) {
      throw new Error(`Could not find ${this.type} identifier`)  
    }

    const identifierSourceArray = identifierSource.split(/\n/);
    const routerName = classify(`${resource}${classify(this.type)}`);

    identifierSourceArray.splice(5,0,`  ${routerName}: Symbol.for('${routerName}'),`);

    const newContent = identifierSourceArray.join('\n');
    
    tree.overwrite(identifierPath, newContent);

    return tree;
  }
}