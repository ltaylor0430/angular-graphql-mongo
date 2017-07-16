import { NgModule } from '@angular/core';
// Angular material
import {
  MdButtonModule, MdCardModule,
  MdCoreModule,
  MdProgressSpinnerModule,
  MdToolbarModule
} from '@angular/material';
const MATERIAL = [
  MdCoreModule,
  MdButtonModule,
  MdToolbarModule,
  MdProgressSpinnerModule,
  MdCardModule

];
@NgModule({
  imports: [...MATERIAL],
  exports: [...MATERIAL]
})
export class MaterialCustomModule { }
