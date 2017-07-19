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
import { fakeAsync } from "@angular/core/testing";
import { tick } from "@angular/core/testing";

describe(`Techorder List`, () => {
  let comp: TechorderListComponent;
  let fixture: ComponentFixture<TechorderListComponent>;
  let model: TechorderModel;
  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechorderListComponent],
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

    model = {
      _id: '12345',
      uid: 'a!421df0',
      name: 'TO-12345',
      publicationDate: '10 January 2018',
      changeDate: '10/10/2018',
      description: 'A test model'
    };
    comp.techorderItems = Observable.of([model]);
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
  // sychronous test
  test('techorder list to have Inputs  of techorder items', fakeAsync( () => {

    const techorderItems = comp.techorderItems;
    let actual: number = -1;
    expect(techorderItems).toBeDefined();
    techorderItems.count().subscribe((results) => actual = results);
    tick(2);
    expect(actual).toBeGreaterThan(0);
  }));

  test('should have a selectedItem event handler', () => {
    expect(comp.onSelectedItem).toBeDefined();
  });

  test('should emit selected Item to Techorder Component', () => {
    spyOn(comp.onSelectedItem, 'emit');
    const nativeElement = fixture.nativeElement;
    const techorderItem = nativeElement.querySelector('techorder-item');
    console.log(techorderItem);
    comp.selectedItem(model);
    techorderItem.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(comp.onSelectedItem.emit).toBeCalledWith(model);
  });
});
