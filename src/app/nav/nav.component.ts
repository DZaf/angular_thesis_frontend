import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

title:string = "My first Angular app";

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
