import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TechorderItemComponent } from './+techorder-item/techorder-item.component';
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
import { TechorderListComponent } from './techorder-list.component';
import { TechorderModel } from '../techorder/techdata-model';

describe(`Techorder List`, () => {
  let comp: TechorderListComponent;
  let fixture: ComponentFixture<TechorderListComponent>;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechorderListComponent, TechorderItemComponent],
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
    fixture = TestBed.createComponent(TechorderListComponent);
    comp = fixture.componentInstance;
    comp.techorderItems = Observable.of([1, 2, 3, 4, 5]);
    /**
     * Trigger initial data binding.
     */
    fixture.detectChanges();
  });
  test('component should exist', () => {
    expect(comp).toBeDefined();
  });
  test('techorder list item to be defined', () => {
    const nativeElement = fixture.nativeElement;
    const techorderItem = nativeElement.querySelector('techorder-item');

    expect(techorderItem).not.toBeNull();
  });
  test('techorder list to have Inputs  of techorder items', () => {

    const techorderItems = comp.techorderItems;
    expect(techorderItems).toBeDefined();
  });

  test('should have a selectedItem event handler', () => {
    expect(comp.onSelectedItem).toBeDefined();
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
