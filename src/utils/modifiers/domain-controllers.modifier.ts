import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";
import { existsSync } from "fs";
import { join } from "path";

class DomainControllersModifier {
  private static type = 'controller';
  
  public static addResource(tree:Tree, rootDir:string, domain:string, resource:string):Tree {
    const httpPath = join( rootDir, 'domains', domain, 'http');
    const controllersFilePath = join(httpPath, 'controllers','index.ts' );    

    if (!existsSync(controllersFilePath)) {
      throw new Error(`Could not find ${domain} ${this.type} file: ${controllersFilePath}`);
    }

    const controllersFileSource = tree.read(controllersFilePath)?.toString() || '\n';

    const controllersFileSourceArray = controllersFileSource.split(/\n/).filter(row=> !!row);
  
    const importSource = `export * from './${dasherize(resource)}.controller';`;

    const newContent = [...controllersFileSourceArray, importSource, ''].join('\n');
    
    tree.overwrite(controllersFilePath, newContent);

    return tree;
  }
}

export { DomainControllersModifier }