import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageForm: FormGroup;
  users: Object;
  result: Object = { 
    "message":{
      "email":"","name":"","password":"","surname":"",_id:"","message":""}};
  problem: Boolean = null;
  isproblem:Boolean = null;

 constructor(private formBuilder: FormBuilder, private data: DataService) {

  this.messageForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
  })
}

onSubmit(){

  const email = this.messageForm.controls.email.value;
  const password = this.messageForm.controls.password.value;

  let userlg = {
    "email": email,
    "password": password
  }

  this.data.Login(userlg)
      .subscribe(data => {this.result=data; this.problem=true; this.isproblem=false; console.log(data);}, error => {this.result=error; this.isproblem=true;  this.problem=false; console.log(error); })       
}

  ngOnInit() {
  }

}
