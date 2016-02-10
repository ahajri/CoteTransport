import {Component} from 'angular2/core';
import {User} from './user';

@Component({
  selector: 'user-detail',
  template: `
    <div *ngIf="user">
      <div>
        <label>username: </label>
        <input [(ngModel)]="user.username" placeholder="username"/>
      </div>
       <div>
        <label>username: </label>
        <input [(ngModel)]="user.password" type="password" placeholder="password"/>
      </div>
    </div>
  `,
  inputs: ['user']
})
export class UserDetailComponent {
  public user: User;
}