import {Component} from 'angular2/core';
interface Hero {
  username: string;
  password: string;
}

@Component({
    selector: 'my-app',
    template:`
	  <h1>{{title}}</h1>
	  <h2>{{hero.username}}</h2>
	  <h2>{{hero.password}}</h2>
	  <div class="form-group" >
	    <label>username: </label>
	    <div><input [(ngModel)]="hero.username" placeholder="username" class="form-control"></div>
	  </div>
	  <div class="form-group" >
	    <label>password: </label>
	    <div><input type="password" [(ngModel)]="hero.password" placeholder="password" class="form-control"></div>
	  </div>
  `
 })

export class AppComponent { 
 public title = 'Welcome';
 //instantite hero class
 public hero: Hero = {
  	username: 'Windstorm',
  	password: 123
 };
}


