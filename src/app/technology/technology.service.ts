import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TechnologyService {
  private readonly url: string = 'https://restcountries.com/v3.1/all?fields=name,flags';

  constructor(public readonly http: HttpClient) {
    this.getBinance().subscribe(console.log);
  }

  public getBinance(): Observable<Object> {
    return this.http.get(this.url);
  }
}
