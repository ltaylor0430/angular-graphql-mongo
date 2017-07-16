import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TechorderModel } from './techdata-model';
@Injectable()
export class TechorderService {

  constructor(private http: Http) {
    this.http = http;
  }
  public getTechorders(): Observable<TechorderModel> {
   return null;
  }
}
