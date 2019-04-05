import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

messageForm: FormGroup;
users: Object;
result: Object;

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
      .subscribe(data => {this.result=data; console.log(data);})           
}

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }

}
