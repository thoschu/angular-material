import { Injectable } from '@angular/core';

@Injectable()
export class ImprintService {

  constructor() { }

  public addToKey(res: Record<string, unknown>): Record<string, unknown> {
    const newRes: Record<string, unknown> = {};
    let count: number = 187;

    for (let key in res) {
      newRes[`${String.fromCharCode(count)} ${key}`] = res[key];
      // count++;
    }

    return newRes;
  }

  public removeFirstLast(str: string): string {
    if (str.length <= 2) {
      return '';
    } else {
      return str.substring(1, str.length - 1)
        .replaceAll('"', '')
        .replaceAll(',', '');
    }
  }
}
