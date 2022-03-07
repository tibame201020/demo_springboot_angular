import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ManageComponent } from './manage/manage.component';
import { HistoryComponent } from './history/history.component';
import { ShareModule } from '../share.module';



@NgModule({
  declarations: [
    HomeComponent,
    ManageComponent,
    HistoryComponent
  ],
  imports: [
    ShareModule
  ]
})
export class PublishModule { }
