import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GitIdInfoService } from './git-id-info.service';
import { IssueInfoService } from './issue-info.service'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IdListComponent } from './id-list/id-list.component';

import { MatInputModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    IdListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [GitIdInfoService, IssueInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
