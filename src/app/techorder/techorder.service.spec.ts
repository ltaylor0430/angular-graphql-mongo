import { TechorderService } from './techorder.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  inject,
  async,
  TestBed,

  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

/**
 * Load the implementations that should be tested.
 */
import { TechorderComponent } from './techorder.component';
import { TechorderModel } from './techdata-model';
export class RouterStub {
  public navigate(url: any[], params: any) { return url; }
}
describe(`Techorder Service`, () => {
  let techService: TechorderService;
  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        TechorderService,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: Router,
          useClass: RouterStub
        }
      ]
    })
      /**
       * Compile template and css.
       */
      .compileComponents();
  }));
  /**
   * Synchronous beforeEach.
   */
  beforeEach(inject([TechorderService], (ts: TechorderService) => {
    techService = ts;
  }));

  test('service should exist', () => {
    expect(techService).toBeDefined();
  });

  test('service should return techorder list ', () => {
    expect(techService.getTechorders).toBeDefined();
  });
  test('service should return parts list ', () => {
    expect(techService.getParts).toBeDefined();
  });
  test('service should return figures list ', () => {
    expect(techService.getFigures).toBeDefined();
  });
  test('service should return parts found in list ', () => {
    expect(techService.getPartsFoundIn).toBeDefined();
  });
});
