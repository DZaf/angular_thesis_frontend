import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  title: string = "My first Angular app";
  LogedInBoolean = false;

  constructor(private _router: Router, private data: DataService) { }

  ngOnInit() {
    setInterval(() => {
      this.check();
  }, 1000);
  }

  logout() {
    this.LogedInBoolean = false;
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  check(){
    
    this.data.Verify()
    .subscribe(result =>      
      { this.LogedInBoolean = true;},
      error => { this.LogedInBoolean = false; });
  }

}
