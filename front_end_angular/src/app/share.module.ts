import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { CkeditorComponent } from './rich-text/ckeditor/ckeditor.component';


@NgModule({
  imports: [
    CommonModule,
    CKEditorModule
  ],
  declarations: [
    CkeditorComponent
  ],
  exports:[
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FlexLayoutModule,
    CkeditorComponent,
  ]
})
export class ShareModule {}

