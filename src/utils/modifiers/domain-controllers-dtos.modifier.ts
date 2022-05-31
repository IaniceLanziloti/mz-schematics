import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { Tree } from "@angular-devkit/schematics";
import { existsSync } from "fs";
import { join } from "path";

class DomainControllersDtosModifier {
  private static type = 'controller';
  private static dtos = [
    'create-body','delete-params','index-params','show-params', 'update-body', 'update-params'
  ]

  public static addResource(tree:Tree, rootDir:string, domain:string, resource:string):Tree {
    const importsNames = this.dtos.map(dto=>`${ dasherize(resource)}-${dto}.dto`);
    const dtosPath = join( rootDir, 'domains', domain, 'dtos');
    const controllersDtosFilePath = join(dtosPath, 'controllers','index.ts' );    

    if (!existsSync(controllersDtosFilePath)) {
      throw new Error(`Could not find ${domain} ${this.type} dtos file: ${controllersDtosFilePath}`);
    }

    const controllersDtosFileSource = tree.read(controllersDtosFilePath)?.toString() || '\n';

    const controllersDtosFileSourceArray = controllersDtosFileSource.split(/\n/).filter(row=> !!row);
  
    const importsSource = importsNames.map(filename=> `export * from './${filename}';`);

    const newContent = [...controllersDtosFileSourceArray, ...importsSource, ''].join('\n');
    
    tree.overwrite(controllersDtosFilePath, newContent);

    return tree;
  }
}

export { DomainControllersDtosModifier }