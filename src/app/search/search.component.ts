import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  messageForm: FormGroup;
  code = true;
  web_apis = false;
  everywere = false;
  constructor(private formBuilder: FormBuilder, private data: DataService) {

    this.messageForm = this.formBuilder.group({
      keyword: ['', Validators.required]
    })


   }
 
  ngOnInit() {
  }

   onClick(input){

    if (input == "code"){
      this.code = true;this.web_apis = false;this.everywere = false;
    }
    else if (input == "web_apis"){
      this.code = false;this.web_apis = true;this.everywere = false;
    }else{
      this.code = false;this.web_apis = false;this.everywere = true;
    }


   }
   
   

}
