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
  form: FormGroup = new FormGroup({});
  public Editor = ClassicEditor;
  public config = ckeditorConfig;
  codeNmLs: CodeNmModel[] = [];
  codeNmKey: string = '';

  constructor(private SideBarService: SideBarService,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private PublishService: PublishService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      codeNm: ['', Validators.required],
      title: ['', Validators.required],
      ckContent: ['']
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    console.log(this.codeNmKey);
  }

  getCodeNmKey(key: string) {
    this.codeNmKey = key;
  }

  selectCodeNmLs() {
    let codeNm = this.form.value.codeNm.trim();
    if (codeNm.length) {
      if (codeNm.indexOf(' - ') != -1) {
        codeNm = codeNm.split(' - ')[0].trim();
      }
      if (codeNm.indexOf('-') != -1) {
        codeNm = codeNm.split('-')[0].trim();
      }
      this.PublishService.getCodeNmLs(codeNm).subscribe(
        res => {
          if (res.datas) {
            this.codeNmLs = [];
            res.datas.forEach((element: CodeNmModel) => {
              if (element.c.startsWith(codeNm) || element.n.indexOf(codeNm)) {
                this.codeNmLs.push(element);
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '查無資料',
            })
          }
        }
      );
    } else {
      this.codeNmLs = [];
    }
  }

  checkSellRole(): boolean {
    return JSON.stringify(this.AuthService.userValue.roles).indexOf('Seller') != -1
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );

    editor.plugins.get('FileRepository').createUploadAdapter = function (loader: any) {
      return new Base64UploadAdapter(loader);
    };
  }

}
