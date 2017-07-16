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
import { TechorderModel } from "./techdata-model";
export class RouterStub {
  public navigate(url: any[], params: any) { return url; }
}
describe(`Techorder`, () => {
  let comp: TechorderComponent;
  let fixture: ComponentFixture<TechorderComponent>;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechorderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BaseRequestOptions,
        MockBackend,
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
  beforeEach(() => {
    fixture = TestBed.createComponent(TechorderComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding.
     */
    fixture.detectChanges();
  });
  test('component should exist', () => {
    expect(comp).toBeDefined();
  });

  test('selectedItem should navigate to Figures',
    inject([Router], (router: Router) => {
      const model: TechorderModel = {
        _id: '12345',
        uid: 'a!421df0',
        name: 'TO-12345',
        description: 'A test model'
      };

      const spy = spyOn(router, 'navigate');
      // select item
      console.log('spy', spy);
      comp.onSelectedItem(model);
      const navArgs = spy.calls.first().args[0];
      const id = model._id;
      expect(navArgs).toEqual(['/figures', id]);
    }));
});
