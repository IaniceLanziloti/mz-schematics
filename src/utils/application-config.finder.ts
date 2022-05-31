import {  join, Path } from "@angular-devkit/core";
import { DirEntry, Tree } from "@angular-devkit/schematics";

export class ApplicationConfigFinder {
  private configurationFilename = 'mz-cli.json';
  constructor(private tree: Tree) {}

  public find(path: string): Path | null{
    const directory = this.tree.getDir(path);
    return this.findIn(directory)
  }

  private findIn(directory: DirEntry): Path | null {
    if (!directory) {
      return null;
    }
   
    const configurationFile = directory.subfiles.find(filename=>
      filename.valueOf() === this.configurationFilename )
    
    return configurationFile !== undefined 
      ? join(directory.path, configurationFile.valueOf())
      : this.findIn(directory.parent as DirEntry);
  }
}