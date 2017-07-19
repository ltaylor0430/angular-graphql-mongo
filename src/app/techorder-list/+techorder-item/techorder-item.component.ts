import { EventEmitter } from 'events';
import { Component, OnInit, Output, Input } from '@angular/core';
import { TechorderModel } from '../../techorder/techdata-model';

@Component({
  selector: 'techorder-item',
  template: `<md-card (click)="onSelectedItem($event)">
  <md-card-content>
  <div>
    <div> {{item.name}}</div>
    <div> {{item.description}}</div>
    <div> {{item.publicationDate}}</div>
    <div> {{item.changeDate}}</div>
  </div>
  </md-card-content>
  </md-card>`
})
export class TechorderItemComponent {
  @Input() public item: TechorderModel;
  @Output() public selected = new EventEmitter();

  public onSelectedItem($event: any): void {
    this.selected.emit($event);
  }
}
