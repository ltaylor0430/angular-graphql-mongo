import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TechorderModel } from "./techdata-model";

@Component({
  selector: 'techorder',
  template: `<md-card>
              <md-card-title>Techorder</md-card-title>
              <md-card-content>
                <techorder-list (on-selected-item)="onSelectedItem"></techorder-list>
              </md-card-content>
             </md-card>`

})
export class TechorderComponent {
  constructor(private router: Router) { }
  public onSelectedItem(model: TechorderModel): Promise<boolean> {
    return this.router.navigate(['/figures', model._id]);
  }
}
