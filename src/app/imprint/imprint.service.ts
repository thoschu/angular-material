import { Injectable } from '@angular/core';
import {} from 'ramda';

@Injectable()
export class ImprintService {
  private readonly character: number;

  public constructor() {
    this.character = 8998;
  }

  public addToKey(res: Record<string, unknown>): Record<string, unknown> {
    const newRes: Record<string, unknown> = {};

    for (let key in res) {
      newRes[`${String.fromCharCode(this.character)} ${key}`] = res[key];
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
