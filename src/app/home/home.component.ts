import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Object;


  constructor(private data: DataService, private _router: Router) {
  }


  ngOnInit() {

    this.data.Verify()
      .subscribe(result => {
        this.data.getUsers().subscribe(data => {
          this.users = data;
          console.log(this.users);
        })

      },
        error => { this._router.navigate(['/login']) });



  }




}
