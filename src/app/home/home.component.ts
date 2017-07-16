
import { Component, OnInit } from '@angular/core';
import template from './home.html';
@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  template
})
export class HomeComponent implements OnInit {

  public ngOnInit(): void {
    console.log('Home Component');
  }

}
