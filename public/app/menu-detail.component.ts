import {Component} from 'angular2/core';
import {Menu} from './menu';


@Component({
  selector: 'menu-detail',
  template: `
    <div *ngIf="menu">
      <div>
        <label>name: </label>
        <input [(ngModel)]="menu.name" placeholder="name"/>
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="menu.description" placeholder="name"/>
      </div>
    </div>
  `,
  inputs: ['menu']
})
export class MenuDetailComponent {
  public menu: Menu;
}
