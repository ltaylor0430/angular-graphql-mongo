import { EventEmitter } from 'events';
import { Component, OnInit, Output } from '@angular/core';
import { TechorderModel } from '../../techorder/techdata-model';

@Component({
  selector: 'techorder-item',
  template: `<div>`
})
export class TechorderItemComponent {
  @Input() public item: TechorderModel;
  @Output() public onSelectedItem: EventEmitter = new EventEmitter();
  public onSelect() {
    this.onSelectedItem.emit(this.item);

  }
}
