import { CodeNmModel } from './model/CodeNmModel';
import { PublishService } from './publish.service';
import { SideBarService } from '../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { PUBLISH_SIDE_BAR_CONFIG } from './side-bar-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from '../auth.service';
import { Base64UploadAdapter } from './base64-upload-adapter';
import { ckeditorConfig } from './ck-editor-config';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Editor = ClassicEditor;
  public config = ckeditorConfig;
  codeNmLs: CodeNmModel[] = [];
  form: FormGroup = this.formBuilder.group({
    codeNm: ['', Validators.required],
    title: ['', Validators.required],
    ckContent: ['']
  });

  constructor(private SideBarService: SideBarService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private PublishService: PublishService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

  selectCodeNmLs():void {
    if (this.form.value.codeNm.trim().length) {
      this.PublishService.getCodeNmLs(this.form.value.codeNm.trim()).subscribe(
        res => {
          this.codeNmLs = res;
        })
        this.getBasicInfo(this.form.value.codeNm);
    }
  }

  checkSellRole(): boolean {
    return JSON.stringify(this.AuthService.userValue.roles).indexOf('Seller') != -1
  }

  onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );

    editor.plugins.get('FileRepository').createUploadAdapter = function (loader: any) {
      return new Base64UploadAdapter(loader);
    };
  }

  getBasicInfo(codeNm: string) {
    if (codeNm.trim().indexOf(' - ') != -1) {
      codeNm = codeNm.trim().split(' - ')[0].trim();
    }
    if (codeNm.trim().indexOf('-') != -1) {
      codeNm = codeNm.trim().split('-')[0].trim();
    }
    const beginDate = new Date();
    this.PublishService.getBasicInfo(codeNm, beginDate, null).subscribe(
      res => {
        console.log(res)
      }
    );
  }

}

