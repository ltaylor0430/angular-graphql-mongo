import { Observable } from 'rxjs/Observable';

import { Component, OnInit, Input, Output } from '@angular/core';
import template from './techorder-list.html';

import { TechorderModel } from '../techorder/techdata-model';
import { EventEmitter } from 'events';
@Component({
  selector: 'techorder-list',
  styleUrls: ['./techorder-list.scss'],
  template
})
export class TechorderListComponent implements OnInit {
  @Input() public techorderItems: Observable<any>;
  @Output() public onSelectedItem: EventEmitter = new EventEmitter();

  public ngOnInit(): void {
    console.log('Techorder List Component');
  }

}
