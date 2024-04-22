import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TechnologyService {
  constructor(public readonly http: HttpClient) {
    http.get('https://api4.binance.com/api/v3/ticker/24hr').subscribe(console.log);
  }
}
