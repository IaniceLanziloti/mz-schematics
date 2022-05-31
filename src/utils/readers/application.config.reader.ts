import { Tree } from "@angular-devkit/schematics";
import { ApplicationConfigFinder } from "../finders/application-config.finder";

class ApplicationConfigReader {
  constructor (private tree:Tree) {}

  public read(path:string = '') {
    const configurationFilePath = new ApplicationConfigFinder(this.tree).find(path);
    
    if (!configurationFilePath) {
      throw new Error(`Could not find configuration file.`);
    }
    
    const configurationFile = JSON.parse(
      this.tree.read(configurationFilePath)?.toString()|| 
      `{"rootDir":"src"}`
    );
    
    return configurationFile;
  }
}

export { ApplicationConfigReader }

