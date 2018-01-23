import { GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Repository } from './repo';
import { Issue } from './gitIssue'
import { IssueInfoService } from './issue-info.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  title = 'Nuvention Team F';
  subtitle = 'Status Report';
  summary = '';
  ghId = '';
  ghIds: GitIdInfo[] = [];
  issues: Issue[] = [];
  repo: string[] = [];
  issue_date;
  private getGitsub: Subscription;
  private getReposub: Subscription;
  private getIssuessub: Subscription;
  errorMessage = null;


  constructor(public ids: GitIdInfoService, public issue_info: IssueInfoService) { }


  getRepo() {
    this.getReposub = this.ids.GetRepo().subscribe(data => {
      this.repo.push(data['name'])
      this.repo.push(data['description'])
      console.log(this.repo);
    })
  }


  displayRepoName() {
    return this.repo[0];
  }

  displayRepoDescription() {
    return this.repo[1];
  }

  addGhId() {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo().subscribe( info => {
      this.ghIds.push(info as GitIdInfo);
      console.log(this.ghIds)
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
  }


  formatDate(date : string ) {
    var split_date = date.split(new RegExp('[-T]'), 3);
    console.log(split_date);
    return split_date;
  }


  getIssues() {
    this.getIssuessub = this.issue_info.GetIssue().subscribe( info => {
      info.forEach(element => {
        this.issues.push(element as Issue);
        var created = this.formatDate(element.created_at);
        var updated = this.formatDate(element.updated_at);
        element.created_at = `${created[1]} / ${created[2]} / ${created[0]}`
        element.updated_at = `${updated[1]} / ${updated[2]} / ${updated[0]}`
      });
    })
  }

  getDateISO() {
    let date : string = (<HTMLInputElement>document.getElementById("date_input")).value;
    console.log(date); 
    var split_date = date.split('/', 3);
    split_date.forEach((element, index) => {
      if (element.length == 1) {
        split_date[index] = `0${element}`
      }
    });
    return `${split_date[2]}-${split_date[0]}-${split_date[1]}T00:00:00Z` 
  }

  getIssuesByDate() {
    //clear the issue table because it'll just append more issues otherwise
    this.issues = [];

    this.getIssuessub = this.issue_info.GetIssue(this.getDateISO()).subscribe( info => {
      info.forEach(element => {
        this.issues.push(element as Issue);
        var created = this.formatDate(element.created_at);
        var updated = this.formatDate(element.updated_at);
        element.created_at = `${created[1]} / ${created[2]} / ${created[0]}`
        element.updated_at = `${updated[1]} / ${updated[2]} / ${updated[0]}`
      });
    });
  }

  //Fetches repository name and description when page loads
  ngOnInit() {
    this.getRepo();
    this.getIssues();
  }

  ngOnDestroy() {
    this.getGitsub.unsubscribe();
    this.getReposub.unsubscribe();
  }
}

