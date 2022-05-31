import { plural } from 'pluralize'

export class Pluralize {
  
  public static findInFamiliar(word:string):string | void {
    const FAMILIAR_WORDS = {
      router:'routes',
    }

    const familiarWord = Object.entries(FAMILIAR_WORDS).find(([key,_value]) => key===word );

    if (familiarWord)  {
      const [_key, value] = familiarWord;
      return value
    }
    
  }

  public static run(word:string):string {
    const recognized = this.findInFamiliar(word);

    if (recognized) {
      return recognized;
    }    

    return plural(word);
  }
}