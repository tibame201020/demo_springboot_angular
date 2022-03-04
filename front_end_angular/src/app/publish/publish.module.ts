import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ManageComponent } from './manage/manage.component';
import { HistoryComponent } from './history/history.component';



@NgModule({
  declarations: [
    HomeComponent,
    ManageComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublishModule { }
