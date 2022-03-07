import { SideBarService } from '../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { PUBLISH_SIDE_BAR_CONFIG } from './side-bar-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  public Editor = ClassicEditor;

  constructor(private SideBarService:SideBarService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      codeNm: ['', Validators.required],
      title: ['', Validators.required],
      ckContent:['']
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

}
