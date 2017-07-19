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
import { TechorderItemComponent } from './techorder-item.component';
import { TechorderModel } from '../../techorder/techdata-model';

describe(`Techorder Item`, () => {
  let comp: TechorderItemComponent;
  let fixture: ComponentFixture<TechorderItemComponent>;
  let model: TechorderModel;
  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechorderItemComponent],
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
    fixture = TestBed.createComponent(TechorderItemComponent);
    comp = fixture.componentInstance;
    model = {
      _id: '12345',
      uid: 'a!421df0',
      name: 'TO-12345',
      publicationDate: '10 January 2018',
      changeDate: '10/10/2018',
      description: 'A test model'
    };
    comp.item = model;
    /**
     * Trigger initial data binding.
     */
    fixture.detectChanges();
  });
  test('component should exist', () => {
    expect(comp).toBeDefined();
  });

  test('should emit selected Item to Techorder List Component', () => {
    spyOn(comp.selected, 'emit');
    const nativeElement = fixture.nativeElement;
    const techorderItem = nativeElement.querySelector('md-card');
    console.log(techorderItem);
    comp.selected.emit(model as any);
    techorderItem.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(comp.selected.emit).toBeCalledWith(model);
  });
});
