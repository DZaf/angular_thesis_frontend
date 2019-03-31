import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  messageForm: FormGroup;
  response: Object;
  errorResponse: Object;
  reposi:Object;

  constructor(private formBuilder: FormBuilder, private data: DataService) {

    this.messageForm = this.formBuilder.group({
      repo: ['', Validators.required],
      language: [''],
    })
  }

  onSubmit(){
    if (this.messageForm.invalid) {
      //console.log(this.messageForm.controls);
      return;
    }
    const repo = this.messageForm.controls.repo.value;
    const language = this.messageForm.controls.language.value;

    this.data.gitsearch(repo,language)
    .subscribe(result =>
      
      {this.response=result; console.log(result);;
        },
      error => {this.errorResponse = error; console.log(error); } );
  }
  ngOnInit() {}


}
