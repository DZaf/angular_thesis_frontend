import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  response: Object;
  errorResponse: Object;

  constructor(private formBuilder: FormBuilder, private data: DataService) {

    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      //console.log(this.messageForm.controls);
      return;
    }
    this.success = true;

    let user = {
      "name": this.messageForm.controls.name.value,
      "surname": this.messageForm.controls.surname.value,
      "email": this.messageForm.controls.email.value,
      "password": this.messageForm.controls.password.value
    }

    this.data.registerUser(user)
      .subscribe(data =>
        this.response = data,
        error => this.errorResponse = error
      );
  }

  ngOnInit() {
  }

}
