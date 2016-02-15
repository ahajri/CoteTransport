import {Component} from 'angular2/core';
import {UserDetailComponent} from './user-detail.component';
import {MenuDetailComponent} from './menu-detail.component';
import {User} from './user';
import {Menu} from './menu';


@Component({
    selector: 'my-app',
    template: `
 <div  align="center">
 <h1>{{title}}</h1>
    <ul class="menus">
      <li *ngFor="#menu of menus"  id="menu" title="{{menu.description}}"
        [class.selected]="menu === selectedMenu"
        (click)="onSelect(menu)">{{menu.name}}
          </li>
        </ul>
        <menu-detail [menu]="selectedMenu"></menu-detail>
    </div>
    `,
    styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .menus {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 10em;
  }
  .menus li {
     display: inline-block;
    cursor: pointer;
    left: 5;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.6em;
    border-radius: 4px;
  }
  .menus li.selected:hover {
    color: white;
  }
  .menus li:hover {
    color: #607D8B;
    background-color: orange;
    left: .1em;
  }
  .menus .text {
    position: absolute;
    top: -3px;
  }
  .menus .badge {
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
  }
`]

})
export class AppComponent {
    public title = 'Cote Transport';
    public menus = MENUES;
    public selectedMenu: Menu;
    onSelect(menu: Menu) { this.selectedMenu = menu; }
}

var MENUES: Menu[] = [
    { "name": "Home", "description": " Home Page", "url":null,"uri":"" },
    { "name": "On Map", "description": "Search on Map",  "url":null,"uri":"" },
    { "name": "RealTime", "description": "Discuss on Real Time" ,  "url":null,"uri":""},
    { "name": "Schedule", "description": "Schedule any search",  "url":null,"uri":"" }
];
