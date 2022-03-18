import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { CkeditorComponent } from '../rich-text/ckeditor/ckeditor.component';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { KLineComponent } from './k-line/k-line.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StockBasicInfoComponent } from './stock-basic-info/stock-basic-info.component';



@NgModule({
  imports: [
    CommonModule,
    CKEditorModule,
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [
    CkeditorComponent,
    DatePickerRangeComponent,
    CandlestickChartComponent,
    KLineComponent,
    StockBasicInfoComponent
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
    DatePickerRangeComponent,
    AngularMaterialModule,
    CandlestickChartComponent,
    KLineComponent
  ]
})
export class ShareModule {}

