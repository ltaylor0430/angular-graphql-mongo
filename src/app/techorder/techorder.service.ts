import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { TechorderModel } from './techdata-model';
@Injectable()
export class TechorderService {
  private mongoServer: string = 'localhost:4000';
  constructor(private http: Http) {
    this.http = http;
  }
  public getTechorders(): Observable<Response> {
    //get
    return this.http.get('${mongoServer}/graphQL', {   }).retry(3);

  }
  public getFigures(): Observable<TechorderModel> {
    return null;
  }
  public getParts(): Observable<TechorderModel> {
    return null;
  }
  public getPartsFoundIn(): Observable<TechorderModel> {
    return null;
  }
}
