import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialCustomModule } from './../app.material-custom.module';
// tslint:disable-next-line:max-line-length
import { TechorderItemComponent } from './../techorder-list/+techorder-item/techorder-item.component';
import { TechorderListComponent } from './../techorder-list/techorder-list.component';
import { TechorderComponent } from './techorder.component';
import { TechorderService } from './techorder.service';

@NgModule({
  imports: [CommonModule,
    HttpModule,
    MaterialCustomModule],
  exports: [TechorderComponent],
  declarations: [TechorderComponent,
    TechorderListComponent,
    TechorderItemComponent],
  providers: [TechorderService],
})
export class TechorderModule { }
