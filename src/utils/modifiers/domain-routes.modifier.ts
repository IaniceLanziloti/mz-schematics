import { camelize, classify, dasherize } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";
import { existsSync } from "fs";
import { join } from "path";
import { toUpperCase } from "../functions/utils";

class DomainRoutesModifier {
  private static type = 'route';
  
  public static addResource(tree:Tree, rootDir:string, domain:string, resource:string):Tree {
    const httpPath = join( rootDir, 'domains', domain, 'http');
    const routesFilePath = join(httpPath, 'routes','index.ts' );    

    if (!existsSync(routesFilePath)) {
      throw new Error(`Could not find ${domain} ${this.type} file: ${routesFilePath}`);
    }

    const routesFileSource = tree.read(routesFilePath)?.toString() || '\n';

    const routesFileSourceArray = routesFileSource.split(/\n/);
  
    const classIndex = routesFileSourceArray.findIndex(row=> row.includes('class'));   
    
    if ( classIndex === -1 ) {
      throw new Error('Could not find class entry');
    }
        
    const importSource = `import { ${ toUpperCase(domain) }_ROUTES } from 'domains/${dasherize(domain)}/identifiers';`;

    routesFileSourceArray.splice(0,0, importSource);

    const classConstructorIndex = routesFileSourceArray.findIndex(row => row.includes('constructor'))

    if ( classConstructorIndex === -1 ) {
      throw new Error( 'Could not find class constructor' );
    }

    const constructorRowSource = routesFileSourceArray[classConstructorIndex];

    const constructorInjection  = [
      `    @inject(${toUpperCase(domain)}_ROUTES.${classify(resource)}Router)`,
      `    private ${camelize(resource)}Router: IRouter`,
    ];
    
    if (constructorRowSource.includes(')')) {
      const newConstructorSource = [
        '  constructor(',
        ...constructorInjection,
        '  ) {'
      ]
      routesFileSourceArray.splice(classConstructorIndex,1, ...newConstructorSource);
    } else {
      routesFileSourceArray.splice(classConstructorIndex+4,0, ...constructorInjection);
    }   
    
    const newContent = routesFileSourceArray.join('\n');
    
    tree.overwrite(routesFilePath, newContent);

    return tree;
  }
}

export { DomainRoutesModifier }