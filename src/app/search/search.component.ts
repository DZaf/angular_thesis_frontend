import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showMore = false;
  messageForm: FormGroup;
  spinner = false;
  code = true;
  web_apis = false;
  everywere = false;
  multisearch = true;
  codeResponse: any;
  apisResponse: any;
  dirResponse: any;
  owner = "";
  repo = "";
  errors = false;
  errorMessage = "";
  openModal = false;
  tree: any;
  //everywhereResponse: any;
  keyword: String;
  adv_search = false;
  adv_search_data: any = {};
  tags = [];
  /* edo to mail tou xristi */
  email: any = localStorage.getItem('email');
  constructor(private formBuilder: FormBuilder, private data: DataService, private _router: Router) {

    this.messageForm = this.formBuilder.group({
      keyword: ['', Validators.required],
      language: ['', Validators.required],
      hasProvider: [''],
      category: [''],
      SSLSupport: [''],
      doc_url: [''],
      auth_model: [''],
      created_after: [''],
      swagger: [''],
      license_url: [''],
      hasProtocol: [''],
      hasSupportedReqFormat: [''],
      hasSupportedResFormat: [''],
    })


  }

  ngOnInit() {

    this.data.Verify()
      .subscribe(result => { },
        error => { this._router.navigate(['/login']) });

  }

  onClick(input) {
    delete this.codeResponse;
    delete this.apisResponse;
    this.errors = false;
    if (input == "code") {
      this.code = true; this.web_apis = false; this.everywere = false;
    }
    else if (input == "web_apis") {

      this.code = false; this.web_apis = true; this.everywere = false;

    } else {
      this.code = false; this.web_apis = false; this.everywere = true;
      this.multisearch = false;
    }


  }

  filters() {
    if (!this.adv_search) {
      this.adv_search = true;
    } else {
      this.adv_search = false;
    }
  }

  show_more($event, div_class) {

    String(div_class).replace(/./, ' ');
    String(div_class).replace(/ /, '-');
    console.log(div_class);
    let showMoreDiv = document.getElementById(div_class);
    console.log(showMoreDiv);
    if (showMoreDiv.style.display == "flex") {
      showMoreDiv.style.display = "none";
      $event.currentTarget.innerHTML = "show more";
    } else {
      showMoreDiv.style.display = "flex";
      $event.currentTarget.innerHTML = "show less";
    }


    // .style.display = "block"; 
  }

  getText(label) {
    if (label) {
      return label.replace(/^.*\//g, '');
    }
    return
  };



  onSubmit() {
    this.errors = false;
    console.log(this.errors);

    delete this.apisResponse;
    this.spinner = true;
    delete this.codeResponse;
    //console.log(this.messageForm.controls)


    if (this.code || this.everywere) {
      console.log("submiting form for Code search");

      this.keyword = this.messageForm.controls.keyword.value;
      const language = this.messageForm.controls.language.value;
      if (this.everywere) {
        this.multisearch = false;
      }

      this.data.gitsearch(this.keyword, language)
        .subscribe(result => {
          //this.spinner = false;
          if (this.multisearch) {
            this.spinner = false;
          }
          this.codeResponse = result;
          console.log(result);;
        },
          error => {
            console.log(error.message);
            this.errorMessage = error.message
            this.errors = true;
            this.spinner = false;
          });

    }
    if (this.web_apis || this.everywere) {
      console.log("submiting form for  Apis search");

      this.keyword = this.messageForm.controls.keyword.value;

      //console.log(this.keyword);

      //this.tags.push(this.keyword);
      this.tags.push(this.keyword.split(/(\s+)/).filter(e => e.trim().length > 0));

      Object.entries(this.messageForm.controls).forEach(

        ([key, value]) => { if (key != "keyword") { this.adv_search_data[key] = value.value } }//console.log(key, value.value)
      );
      console.log(this.tags);
      console.log(this.adv_search_data);
      //return 0 ;

      this.data.apiSearch(this.email, this.tags, this.adv_search_data).subscribe(result => {
        this.spinner = false;
        if (this.everywere) {
          this.multisearch = true;
        }
        if (this.multisearch) {
          this.spinner = false;
        }
        this.apisResponse = result;
        console.log(this.apisResponse);
        this.tags = [];
      }, error => {
        console.log(error.message);
        this.errorMessage = error.message
        this.errors = true;
        this.spinner = false;
        this.tags = [];
      })

    }
  }
  getContentData(path) {

    this.data.OpenDir(path, this.owner, this.repo).subscribe(result => {
      this.dirResponse = result;
      console.log(this.dirResponse);
    }, error => {
      console.log(error.message);
      this.errorMessage = error.message
      this.errors = true;
    })

  }

  openModals(trees, owner, repo) {
    this.openModal = true;
    this.tree = trees;
    this.owner = owner;
    this.repo = repo;
  }

  closeModals() {
    this.openModal = false;
    delete this.tree;
  }

  scroll(el) {
    var elmnt = document.getElementById(el);
    elmnt.scrollIntoView({behavior: 'smooth' });
    console.log(el)
  }


}

