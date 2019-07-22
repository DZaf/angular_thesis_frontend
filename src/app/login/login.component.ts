import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from'@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// interface 
export class LoginComponent implements OnInit {

  messageForm: FormGroup;
  users: Object;
  result: any;
  // = { message : Object };

  // { "email":"","name":"","password":"","surname":"",_id:"","message":"","token":{"token":""}}

  problem: Boolean = null;
  isproblem: Boolean = null;

  constructor(private formBuilder: FormBuilder, private data: DataService, private _router: Router) {

    this.messageForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  onSubmit() {

    const email = this.messageForm.controls.email.value;
    const password = this.messageForm.controls.password.value;

    let userlg = {
      "email": email,
      "password": password
    }

    this.data.Login(userlg)
      .subscribe(data => {
        this.result = data;
        this.problem = true;
        this.isproblem = false;
        console.log(data);
        localStorage.setItem('token', this.result.token);
        localStorage.setItem('email', this.result.email)
        this._router.navigate(['/search'])
      }, error => {
        this.result = error;
        this.isproblem = true;
        this.problem = false;
        console.log(error);
      })
  }

  ngOnInit() {
  }

}
